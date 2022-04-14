import React, { useState } from 'react';
import { Button, Header, HeaderGlobalAction, HeaderGlobalBar, HeaderName } from 'carbon-components-react';
import Search20 from '@carbon/icons-react/lib/search/20';
import CloseFilled20 from '@carbon/icons-react/es//close--filled/20';
import { useTranslation } from 'react-i18next';
import styles from './visit-header.scss';
import { age, usePatient } from '@openmrs/esm-framework';
import capitalize from 'lodash-es/capitalize';

interface VisitHeadeProps {}

const VisitHeader: React.FC<VisitHeadeProps> = () => {
  const { t } = useTranslation();
  const { patient } = usePatient();
  const [showVisitHeader, setShowVisitHeader] = useState<boolean>(true);

  if (!showVisitHeader) {
    return null;
  }

  return (
    <>
      {patient && (
        <Header aria-label="OpenMRS">
          <HeaderName prefix="">
            <svg role="img" width={110} height={40}>
              <use xlinkHref="#omrs-logo-white"></use>
            </svg>
          </HeaderName>
          <div className={styles.patientContainer}>
            <span className={styles.patientName}>
              {`${patient?.name?.[0].given?.join(' ')} ${patient?.name?.[0].family}`}{' '}
            </span>
            <span className={styles.patientInfo}>
              {patient && `${parseInt(age(patient.birthDate))}, ${capitalize(patient.gender)}`}
            </span>
          </div>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
              <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction className={styles.headerGlobalBarButton} aria-label="Notifications" onClick={() => {}}>
              <Button as="div" className={styles.startVisitButton}>
                {t('startVisit', 'Start a visit')}
              </Button>
            </HeaderGlobalAction>
            <HeaderGlobalAction
              className={styles.headerGlobalBarButton}
              aria-label={t('close', 'Close')}
              onClick={() => setShowVisitHeader((prevState) => !prevState)}>
              <CloseFilled20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      )}
    </>
  );
};

export default VisitHeader;
