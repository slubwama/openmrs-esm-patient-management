import React from 'react';
import { useLayoutType } from '@openmrs/esm-framework';
import { Search, Button, Tile } from 'carbon-components-react';
import styles from './simple-search.component.scss';
import Search32 from '@carbon/icons-react/es/search/32';
import { useTranslation } from 'react-i18next';
import PatientSearchIcon from './patient-search-icon.component';
import { SearchMode } from '../types';

interface SimpleSearchProps {
  toggleSearchMode: (searchMode: SearchMode) => void;
}

const SimpleSearch: React.FC<SimpleSearchProps> = ({ toggleSearchMode }) => {
  const layout = useLayoutType();
  const isDesktop = layout === 'desktop';
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.searchArea}>
        <Search
          light={!isDesktop}
          className={styles.patientSearchInput}
          placeholder={t('searchForPatient', 'Search for a patient by name or identifier number')}
          labelText=""
          autoFocus={true}
        />
        <Button className={styles.searchButton}>{t('search', 'Search')}</Button>
      </div>

      <div className={styles.searchBox}>
        <Tile light>
          <div className={styles.searchContent}>
            <PatientSearchIcon />
            <p className={styles.searchPatientText}>{t('searchForPatientText', 'Search for a patient')}</p>
            <p className={styles.bodyLong01}>{t('typePatientName', `Type a patient's name or`)}</p> <b></b>
            <p className={styles.bodyLong01}>{t('uniqueIDNumber', 'unique ID number')}</p>
          </div>
        </Tile>

        <div className={styles.separator}>{t('or', 'or')}</div>

        <div className={styles.advanceSearchButton}>
          <Button
            kind="ghost"
            renderIcon={Search32}
            iconDescription="Advanced Search"
            onClick={() => toggleSearchMode(SearchMode.advance)}>
            {t('advancedSearch', 'Advanced Search')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SimpleSearch;
