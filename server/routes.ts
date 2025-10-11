import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const FOUR_M_API_KEY = '3mpag_p7czqd3yk_mfr1pvd2';
const FOUR_M_API_URL = 'https://app.4mpagamentos.com/api/v1';

export async function registerRoutes(app: Express): Promise<Server> {
  // Criar pagamento PIX
  app.post('/api/payments', async (req, res) => {
    try {
      const paymentData = req.body;
      
      // Log do valor enviado
      console.log('💰 Criando pagamento com valor:', paymentData.amount);
      console.log('📦 Dados enviados:', JSON.stringify(paymentData, null, 2));
      
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
      
      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      res.json(data);
    } catch (error: any) {
      console.error('Erro ao buscar pagamento:', error);
      res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
