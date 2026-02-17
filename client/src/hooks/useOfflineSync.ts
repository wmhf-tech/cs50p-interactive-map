import { useEffect, useState, useCallback } from 'react';

interface SyncData {
  id: string;
  type: 'quiz_response' | 'profile_update';
  data: any;
  timestamp: number;
  synced: boolean;
}

const DB_NAME = 'cs50p-offline-db';
const STORE_NAME = 'sync_queue';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingItems, setPendingItems] = useState<SyncData[]>([]);

  // Inicializar IndexedDB
  const initDB = useCallback(async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }, []);

  // Salvar dados para sincronização
  const saveForSync = useCallback(
    async (type: 'quiz_response' | 'profile_update', data: any) => {
      try {
        const db = await initDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const syncItem: SyncData = {
          id: `${type}-${Date.now()}-${Math.random()}`,
          type,
          data,
          timestamp: Date.now(),
          synced: false,
        };

        store.add(syncItem);

        return new Promise((resolve, reject) => {
          transaction.oncomplete = () => resolve(syncItem);
          transaction.onerror = () => reject(transaction.error);
        });
      } catch (error) {
        console.error('Erro ao salvar para sincronização:', error);
        throw error;
      }
    },
    [initDB]
  );

  // Obter itens pendentes
  const getPendingItems = useCallback(async (): Promise<SyncData[]> => {
    try {
      const db = await initDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const items = request.result as SyncData[];
          resolve(items.filter((item) => !item.synced));
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao obter itens pendentes:', error);
      return [];
    }
  }, [initDB]);

  // Marcar item como sincronizado
  const markAsSynced = useCallback(
    async (id: string) => {
      try {
        const db = await initDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => {
          const item = request.result as SyncData;
          if (item) {
            item.synced = true;
            store.put(item);
          }
        };

        return new Promise((resolve, reject) => {
          transaction.oncomplete = () => resolve(true);
          transaction.onerror = () => reject(transaction.error);
        });
      } catch (error) {
        console.error('Erro ao marcar como sincronizado:', error);
      }
    },
    [initDB]
  );

  // Sincronizar dados
  const syncData = useCallback(async () => {
    if (!isOnline || isSyncing) return;

    setIsSyncing(true);
    try {
      const items = await getPendingItems();
      setPendingItems(items);

      for (const item of items) {
        try {
          // Simular envio para servidor
          // Em produção, isso seria um POST para sua API
          console.log('Sincronizando:', item);

          // Simular delay de rede
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Marcar como sincronizado
          await markAsSynced(item.id);
        } catch (error) {
          console.error('Erro ao sincronizar item:', error);
        }
      }

      // Atualizar lista de itens pendentes
      const remaining = await getPendingItems();
      setPendingItems(remaining);
    } catch (error) {
      console.error('Erro durante sincronização:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, isSyncing, getPendingItems, markAsSynced]);

  // Monitorar status de conexão
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncData();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncData]);

  // Carregar itens pendentes ao iniciar
  useEffect(() => {
    getPendingItems().then(setPendingItems);
  }, [getPendingItems]);

  return {
    isOnline,
    isSyncing,
    pendingItems,
    saveForSync,
    syncData,
    getPendingItems,
  };
}
