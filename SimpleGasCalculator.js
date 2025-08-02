import React, { useState, useEffect } from 'react';
import { Calculator, Flame, Users, Utensils, Info, ExternalLink, BookOpen, Phone } from 'lucide-react';

const SimpleGasCalculator = () => {
  const [inputs, setInputs] = useState({
    residents: 2,
    mealsPerDay: 3,
    gasPrice: 120.00
  });

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
      dailyConsumption,
      daysPerBottle,
      monthlyBottles,
      monthlyCost,
      costPerMeal,
      dailyCost
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const openWhatsApp = () => {
    const phone = "5511990241124";
    const message = encodeURIComponent(
      `Olá! Vi a calculadora de gás e gostaria de fazer um pedido. 
Meu consumo estimado é: ${results.dailyConsumption.toFixed(2)}kg/dia
Duração do botijão: ${results.daysPerBottle.toFixed(0)} dias
Gasto mensal: R$ ${results.monthlyCost.toFixed(2)}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">MASSONI</h1>
      <p className="text-center text-sm text-red-600 mb-6">DISTRIBUIDORA DE GÁS E ÁGUA</p>
      <button
        onClick={openWhatsApp}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 w-full mb-4"
      >
        <Phone className="w-5 h-5" />
        Peça Agora pelo WhatsApp
      </button>
      <div className="space-y-4">
        <label>Moradores:
          <input type="number" value={inputs.residents} onChange={(e) => handleInputChange('residents', e.target.value)} className="block w-full border p-2 rounded" />
        </label>
        <label>Refeições por dia:
          <select value={inputs.mealsPerDay} onChange={(e) => handleInputChange('mealsPerDay', e.target.value)} className="block w-full border p-2 rounded">
            <option value="1">1 refeição</option>
            <option value="2">2 refeições</option>
            <option value="3">3 refeições</option>
            <option value="4">4 refeições</option>
            <option value="5">5 ou mais</option>
          </select>
        </label>
        <label>Preço do botijão (R$):
          <input type="number" value={inputs.gasPrice} onChange={(e) => handleInputChange('gasPrice', e.target.value)} className="block w-full border p-2 rounded" />
        </label>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Consumo diário:</strong> {results.dailyConsumption.toFixed(2)} kg</p>
          <p><strong>Duração:</strong> {results.daysPerBottle.toFixed(0)} dias</p>
          <p><strong>Gasto mensal:</strong> R$ {results.monthlyCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleGasCalculator;
