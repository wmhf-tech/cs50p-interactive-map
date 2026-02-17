import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

export default function ConnectionStatus() {
  const { isOnline, isSyncing, pendingItems } = useOfflineSync();

  if (isOnline && !isSyncing && pendingItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOnline ? (
        <div className="bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <WifiOff size={18} />
          <span className="text-sm font-medium">Modo Offline</span>
        </div>
      ) : isSyncing ? (
        <div className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm font-medium">Sincronizando...</span>
        </div>
      ) : pendingItems.length > 0 ? (
        <div className="bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Wifi size={18} />
          <span className="text-sm font-medium">
            {pendingItems.length} item{pendingItems.length > 1 ? 's' : ''} pendente{pendingItems.length > 1 ? 's' : ''}
          </span>
        </div>
      ) : null}
    </div>
  );
}
