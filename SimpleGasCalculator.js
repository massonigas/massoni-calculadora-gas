
import React, { useState, useEffect } from 'react';
import { Calculator, Flame, Users, Utensils, Info, ExternalLink, BookOpen, Phone } from 'lucide-react';

const SimpleGasCalculator = () => {
  const [inputs, setInputs] = useState({
    residents: 2,
    mealsPerDay: 3,
    gasPrice: 120.00
  });

  const openWhatsApp = () => {
    const phone = "5511990241124";
    const message = encodeURIComponent(
      `Olá! Vi a calculadora de gás e gostaria de salvar o seu contato.  
Meu consumo estimado é: ${results.dailyConsumption.toFixed(2)}kg/dia
Duração do botijão: ${Math.ceil(results.daysPerBottle)} dias
Gasto mensal: R$ ${results.monthlyCost.toFixed(2)}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const [showMethodology, setShowMethodology] = useState(false);

  const [results, setResults] = useState({
    dailyConsumption: 0,
    daysPerBottle: 0,
    monthlyBottles: 0,
    monthlyCost: 0,
    costPerMeal: 0,
    dailyCost: 0
  });

  useEffect(() => {
    calculateConsumption();
  }, [inputs]);

  const calculateConsumption = () => {
    const consumptionPerMeal = {
      1: 0.25,
      2: 0.40,
      3: 0.65,
      4: 0.75,
      5: 0.85
    };

    const baseConsumption = consumptionPerMeal[Math.min(inputs.mealsPerDay, 5)] || 0.65;

    let residentMultiplier;
    if (inputs.residents === 1) residentMultiplier = 0.7;
    else if (inputs.residents === 2) residentMultiplier = 1.0;
    else if (inputs.residents === 3) residentMultiplier = 1.4;
    else if (inputs.residents === 4) residentMultiplier = 1.7;
    else residentMultiplier = 1.7 + (inputs.residents - 4) * 0.25;

    const dailyConsumption = baseConsumption * residentMultiplier;
    const daysPerBottle = 13 / dailyConsumption;
    const monthlyBottles = 30 / daysPerBottle;
    const monthlyCost = monthlyBottles * inputs.gasPrice;
    const costPerMeal = (dailyConsumption * inputs.gasPrice / 13) / inputs.mealsPerDay;
    const dailyCost = dailyConsumption * inputs.gasPrice / 13;

    setResults({
      dailyConsumption: dailyConsumption,
      daysPerBottle: daysPerBottle,
      monthlyBottles: monthlyBottles,
      monthlyCost: monthlyCost,
      costPerMeal: costPerMeal,
      dailyCost: dailyCost
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const getDurationCategory = (days) => {
    if (days > 25) return { category: 'Ótimo', color: 'text-green-600', bg: 'bg-green-50' };
    if (days > 15) return { category: 'Bom', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (days > 10) return { category: 'Médio', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { category: 'Alto Consumo', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const durationInfo = getDurationCategory(results.daysPerBottle);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* A interface completa foi omitida para o exemplo do ZIP */}
      <h1 className="text-xl font-bold">Calculadora de Gás - Massoni Gás</h1>
    </div>
  );
};

export default SimpleGasCalculator;
