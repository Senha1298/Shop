import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const FOUR_M_API_KEY = process.env.FOUR_M_API_KEY;
const FOUR_M_API_URL = 'https://app.4mpagamentos.com/api/v1';

if (!FOUR_M_API_KEY) {
  throw new Error('FOUR_M_API_KEY não configurada. Por favor, adicione a chave da API nas secrets.');
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Criar pagamento PIX
  app.post('/api/payments', async (req, res) => {
    try {
      const paymentData = req.body;
      
      // Log do valor enviado
      console.log('💰 Criando pagamento com valor:', paymentData.amount, '(tipo:', typeof paymentData.amount, ')');
      console.log('📦 Dados enviados para API:', JSON.stringify(paymentData, null, 2));
      
      const response = await fetch(`${FOUR_M_API_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${FOUR_M_API_KEY}`
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();
      
      // Log do valor recebido
      console.log('💸 API retornou valor:', data.data?.amount);
      console.log('📥 Resposta da API:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      res.json(data);
    } catch (error: any) {
      console.error('Erro ao criar pagamento:', error);
      res.status(500).json({ error: 'Erro ao processar pagamento' });
    }
  });

  // Buscar status do pagamento
  app.get('/api/payments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      const response = await fetch(`${FOUR_M_API_URL}/payments/${id}`, {
        headers: {
          'Authorization': `Bearer ${FOUR_M_API_KEY}`
        }
      });

      const data = await response.json();
      
      // Log completo da resposta
      console.log('📨 Status HTTP:', response.status);
      console.log('📦 Resposta completa da API:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      res.json(data);
    } catch (error: any) {
      console.error('Erro ao buscar pagamento:', error);
      res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
  });

  // Verificar status da transação (sem autenticação necessária)
  app.get('/api/transactions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      const response = await fetch(`${FOUR_M_API_URL}/transactions/${id}`);
      const data = await response.json();
      
      console.log('🔍 RESPOSTA COMPLETA DA TRANSAÇÃO:', JSON.stringify(data, null, 2));
      console.log('🎯 Status:', data.status);
      
      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      res.json(data);
    } catch (error: any) {
      console.error('Erro ao verificar transação:', error);
      res.status(500).json({ error: 'Erro ao verificar transação' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
