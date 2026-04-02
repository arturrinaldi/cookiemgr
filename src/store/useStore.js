import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useStore = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, sRes, eRes, schRes] = await Promise.all([
        supabase.from('products').select('*').order('name'),
        supabase.from('sales').select('*').order('date', { ascending: false }),
        supabase.from('expenses').select('*').order('date', { ascending: false }),
        supabase.from('schedule').select('*').order('date', { ascending: true })
      ]);

      if (pRes.error) throw pRes.error;
      if (sRes.error) throw sRes.error;
      if (eRes.error) throw eRes.error;
      if (schRes.error && schRes.error.code !== '42P01') console.warn('Agenda warning:', schRes.error);

      setProducts(pRes.data || []);
      setSales(sRes.data || []);
      setExpenses(eRes.data || []);
      setSchedule(schRes.data || []);
    } catch (err) {
      console.error('Erro ao carregar dados do Supabase:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Products
  const addProduct = async (product) => {
    const { data, error } = await supabase.from('products').insert([product]).select();
    if (error) throw error;
    setProducts(prev => [...prev, ...data]);
    return data[0];
  };

  const updateProduct = async (id, changes) => {
    const { error } = await supabase.from('products').update(changes).eq('id', id);
    if (error) throw error;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...changes } : p));
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Sales
  const addSale = async (items, note = '') => {
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const profit = total; // Profit per sale is now the total, as costs are deducted globally from expenses
    
    const sale = {
      date: new Date().toISOString(),
      items, // JSONB field
      total,
      profit,
      note,
    };

    const { data, error } = await supabase.from('sales').insert([sale]).select();
    if (error) throw error;

    // Deduct stock
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const newStock = Math.max(0, (product.stock || 0) - item.qty);
        await supabase.from('products').update({ stock: newStock }).eq('id', product.id);
      }
    }

    // Refresh data to get updated stock and sales
    await fetchData();
    return data[0];
  };

  const deleteSale = async (id) => {
    const { error } = await supabase.from('sales').delete().eq('id', id);
    if (error) throw error;
    setSales(prev => prev.filter(s => s.id !== id));
  };

  // Expenses
  const addExpense = async (expense) => {
    const newExpense = {
      ...expense,
      date: expense.date || new Date().toISOString(),
    };
    const { data, error } = await supabase.from('expenses').insert([newExpense]).select();
    if (error) throw error;
    setExpenses(prev => [...data, ...prev]);
    return data[0];
  };

  const deleteExpense = async (id) => {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) throw error;
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Schedule
  const addSchedule = async (item) => {
    const { data, error } = await supabase.from('schedule').insert([item]).select();
    if (error) {
       console.error("Por favor, crie a tabela 'schedule' no Supabase!", error);
       throw error;
    }
    setSchedule(prev => [...prev, ...data].sort((a, b) => new Date(a.date) - new Date(b.date)));
    return data[0];
  };

  const deleteSchedule = async (id) => {
    const { error } = await supabase.from('schedule').delete().eq('id', id);
    if (error) throw error;
    setSchedule(prev => prev.filter(s => s.id !== id));
  };

  return {
    products,
    sales,
    expenses,
    schedule,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    addSale,
    deleteSale,
    addExpense,
    deleteExpense,
    addSchedule,
    deleteSchedule,
    refresh: fetchData
  };
};
