import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const standardValues = {
  prixEuro: '258',
  tauxAnnulations: '30',
  tauxRetour: '30',
  coutRetour: '250',
  minusTransport: '150',
  emballage: '50',

};

export default function Home() {
  const [inputs, setInputs] = useState({
    prixAchat: '',
    prixEuro: standardValues.prixEuro,
    tauxAnnulations: standardValues.tauxAnnulations,
    tauxRetour: standardValues.tauxRetour,
    coutRetour: standardValues.coutRetour,
    minusTransport: standardValues.minusTransport,
    emballage: standardValues.emballage,
    costFacebookAds: '1',
    marge: '1000',
  });

  const [results, setResults] = useState({
    coutReel: 0,
    prixVente: 0,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState('');
  const [tempValue, setTempValue] = useState('');

  const handleInputChange = useCallback((name, value) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  const openModal = useCallback((fieldName) => {
    setEditingField(fieldName);
    setTempValue(inputs[fieldName]);
    setModalVisible(true);
  }, [inputs]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setEditingField('');
    setTempValue('');
  }, []);

  const saveModalValue = useCallback(() => {
    handleInputChange(editingField, tempValue);
    closeModal();
  }, [editingField, tempValue, handleInputChange]);

  const calculateCosts = useCallback(() => {
    const {
      prixAchat,
      prixEuro,
      tauxAnnulations,
      tauxRetour,
      coutRetour,
      minusTransport,
      emballage,
      costFacebookAds,
      marge,
    } = inputs;

    const coutReel =
      parseFloat(prixAchat) +
      ((parseFloat(prixEuro) * parseFloat(costFacebookAds) *
        (1 + parseFloat(tauxAnnulations) / 100 + parseFloat(tauxRetour) / 100)) +
        (parseFloat(coutRetour) * parseFloat(tauxRetour) / 100)) +
      parseFloat(minusTransport) +
      parseFloat(emballage);

    const prixVente = coutReel + parseFloat(marge);

    setResults({
      coutReel: parseFloat(coutReel.toFixed(2)),
      prixVente: parseFloat(prixVente.toFixed(2)),
    });
  }, [inputs]);

  useEffect(() => {
    calculateCosts();
  }, [inputs, calculateCosts]);

  const renderInput = (key, label) => {
    const isDefaultField = Object.keys(standardValues).includes(key);
    return (
      <div key={key} className={`mb-4 ${isDefaultField ? 'w-1/2 pr-2' : 'w-full'}`}>
        <Label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </Label>
        {isDefaultField ? (
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => openModal(key)}
          >
            <span>{inputs[key]}</span>
            <span className="text-blue-600">Edit</span>
          </Button>
        ) : (
          <Input
            type="number"
            id={key}
            value={inputs[key]}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={`Enter ${label}`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Product Cost Calculator</title>
        <meta name="description" content="Calculate product costs and pricing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <Card className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <CardHeader>
            <div className="flex justify-center mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-dark-vxXHSU94HpO7wn7xgpgFf68cUlQqZt.png"
                alt="GH SOFT Logo"
                width={160}
                height={80}
              />
            </div>
            <CardTitle className="text-2xl font-semibold text-center">Product Cost Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap -mx-2">
              {renderInput('prixAchat', 'Prix Achat (DA)')}
              {renderInput('prixEuro', 'Prix Euro (DA)')}
              {renderInput('tauxAnnulations', 'Taux Annulations (%)')}
              {renderInput('tauxRetour', 'Taux Retour (%)')}
              {renderInput('coutRetour', 'Cout de Retour (DA)')}
              {renderInput('minusTransport', 'Minus Transport (DA)')}
              {renderInput('emballage', 'Emballage (DA)')}
              {renderInput('costFacebookAds', 'Cost Facebook Ads (€)')}
              {renderInput('marge', 'Marge (DA)')}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Card className="w-full bg-blue-600 text-white">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">Real Cost: {results.coutReel.toLocaleString()} DA</h2>
              </CardContent>
            </Card>
            <Card className="w-full bg-green-600 text-white">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">Selling Price: {results.prixVente.toLocaleString()} DA</h2>
              </CardContent>
            </Card>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={modalVisible} onOpenChange={setModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingField}</DialogTitle>
          </DialogHeader>
          <Input
            type="number"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button onClick={saveModalValue}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}