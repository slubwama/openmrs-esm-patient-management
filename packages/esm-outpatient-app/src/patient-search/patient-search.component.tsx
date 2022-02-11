import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './patient-search.component.scss';
import Overlay from '../overlay.component';
import AdvanceSearch from './advance-search.component';
import SimpleSearch from './simple-search.component';
import { SearchMode } from '../types';

interface PatientSearchLaunchProps {
  close: () => void;
}

const PatientSearchLaunch: React.FC<PatientSearchLaunchProps> = ({ close }) => {
  const { t } = useTranslation();
  const [searchMode, setSearchMode] = useState<SearchMode>(SearchMode.simple);

  const handleToggleSearchMode = (searchMode: SearchMode): void => {
    setSearchMode(searchMode);
  };

  return (
    <>
      <Overlay header={t('addPatientToListHeader', 'Add patient to list')} close={close}>
        <div className={`omrs-main-content`}>
          {searchMode === SearchMode.simple ? (
            <SimpleSearch toggleSearchMode={handleToggleSearchMode} />
          ) : (
            <AdvanceSearch toggleSearchMode={handleToggleSearchMode} />
          )}
        </div>
      </Overlay>
    </>
  );
};

export default PatientSearchLaunch;
