import { Button, ContentSwitcher, DatePicker, DatePickerInput, Form, Switch, TextInput } from 'carbon-components-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './advance-search.component.scss';
import ArrowLeft16 from '@carbon/icons-react/es/arrow--left/16';
import { SearchMode } from '../types';

interface AdvanceSearchProps {
  toggleSearchMode: (searchMode: SearchMode) => void;
}

const AdvanceSearch: React.FC<AdvanceSearchProps> = ({ toggleSearchMode }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.advanceSearchContainer}>
        <Button kind="ghost" tooltipAlignment="start" onClick={() => toggleSearchMode(SearchMode.simple)}>
          <ArrowLeft16 className={styles.arrowLeftSVG} />
          {t('backToSimpleSearch', 'Back to simple search')}
        </Button>

        <div className={styles.searchMatchContentSwitcher}>
          <span>{t('match', 'Match')}</span>
          <ContentSwitcher size="sm" className={styles.searchSwitch} onChange={() => {}}>
            <Switch name={'any'} text={t('any', 'Any')} />
            <Switch name={'all'} text={t('all', 'All')} />
          </ContentSwitcher>
          <span>{t('ofTheFollowingFields', 'of the following fields :')}</span>
        </div>

        <Form>
          <div className={styles.sectionTitle}>
            <span>{t('name', 'Name')}</span>
          </div>
          <div className={styles.formItem}>
            <TextInput light id="firstName" labelText={t('firstName', 'First Name')} onChange={(event) => {}} />
          </div>

          <div className={styles.formItem}>
            <TextInput light id="middleName" labelText={t('middleName', 'Middle Name')} onChange={(event) => {}} />
          </div>

          <div className={styles.formItem}>
            <TextInput light id="lastName" labelText={t('lastName', 'Last Name')} onChange={(event) => {}} />
          </div>

          <div className={styles.sectionTitle}>
            <span>{t('personalDetails', 'Personal Details')}</span>
          </div>
          <div className={styles.formItem}>
            <span className={styles.label01}>{t('sex', 'Sex')}</span>
            <ContentSwitcher onChange={() => {}}>
              <Switch name={'any'} text={t('any', 'Any')} />
              <Switch name={'male'} text={t('male', 'Male')} />
              <Switch name={'female'} text={t('female', 'Female')} />
            </ContentSwitcher>
          </div>

          <div className={styles.formItem}>
            <DatePicker dateFormat="m/d/Y" datePickerType="single" light>
              <DatePickerInput
                id="dob"
                placeholder="mm/dd/yyyy"
                labelText="Date of Birth"
                type="date"
                onChange={(event) => {}}
              />
            </DatePicker>
          </div>

          <div className={styles.formItem}>
            <TextInput light id="phoneNumber" labelText={t('lastName', 'Phone Number')} onChange={(event) => {}} />
          </div>

          <div className={styles.formItem}>
            <TextInput light id="postcode" labelText={t('postCode', 'Post Code')} onChange={(event) => {}} />
          </div>

          <div className={styles.sectionTitle}>
            <span>{t('lastVisit', 'Last Visit')}</span>
          </div>
          <DatePicker dateFormat="m/d/Y" datePickerType="single" light className={styles.formItem}>
            <DatePickerInput
              id="lastvisit"
              placeholder="mm/dd/yyyy"
              labelText="Last Visit"
              type="date"
              onChange={(event) => {}}
            />
          </DatePicker>
        </Form>
      </div>
      <div className={styles.buttonsGroup}>
        <Button kind="secondary" size="lg">
          {t('cancel', 'Cancel')}
        </Button>
        <Button size="lg" onClick={() => {}}>
          {t('search', 'Search')}
        </Button>
      </div>
    </>
  );
};

export default AdvanceSearch;
