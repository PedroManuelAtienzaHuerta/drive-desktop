import { Spinner } from 'phosphor-react';
import { useTranslationContext } from '../../../../context/LocalContext';
import { BackupsState } from '../../../../hooks/backups/useBackups';

interface LoadingFoldersProps {
  state: BackupsState;
}

export function LoadingFolders({ state }: LoadingFoldersProps) {
  const { translate } = useTranslationContext();

  const message: Record<BackupsState, string> = {
    LOADING: 'settings.backups.folders.loading',
    ERROR: 'settings.backups.folders.error',
    SUCCESS: 'settings.backups.folders.no-folders',
  };
  return (
    <div className="flex h-full items-center justify-center">
      {state === 'LOADING' ? (
        <Spinner className="fill-l-neutral-50 h-6 w-6 animate-spin" />
      ) : state === 'ERROR' ? (
        <p className="text-red-50 text-sm">{translate(message[state])}</p>
      ) : (
        <p className="text-l-neutral-50 text-sm">
          {translate('settings.backups.folders.no-folders')}
        </p>
      )}
    </div>
  );
}
