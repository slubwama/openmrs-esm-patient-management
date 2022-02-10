import React, { useState } from 'react';
import {
  Button,
  Search,
  Tile,
  Form,
  ContentSwitcher,
  DatePicker,
  DatePickerInput,
  Switch,
  TextInput,
  ButtonSet,
} from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import styles from './patient-search.component.scss';
import Overlay from '../overlay.component';
import { useLayoutType } from '@openmrs/esm-framework';
import Search32 from '@carbon/icons-react/es/search/32';
import { UserAvatarFilledAlt16 } from '@carbon/icons-react';
import { ArrowLeft32 } from '@carbon/icons-react';
import UserFilled16 from '@carbon/icons-react/es/user--filled/16';

interface PatientSearchLaunchProps {
  close: () => void;
}

const PatientSearchLaunch: React.FC<PatientSearchLaunchProps> = ({ close }) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const [open, setOpen] = useState<boolean>(true);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [first_name, setFName] = useState('');
  const [middle_name, setMName] = useState('');
  const [last_name, setLName] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [post_code, setPostalCode] = useState('');
  const [last_visit, setLastVisit] = useState('');
  const [searchParams, setSearchParams] = useState([]);

  const handleNewSearch = () => {
    setSearchParams([first_name, middle_name, last_name, sex, dob, phone_number, post_code, last_visit]);
  };

  return (
    <>
      <Overlay header={t('addPatientToListHeader', 'Add patient to list')} close={close}>
        <div className={`omrs-main-content ${styles.container}`}>
          <div className="bx--grid">
            {open && (
              <div>
                <div className="bx--row">
                  <div className={styles.patientSearchIconWrapper}>
                    <div className={styles.searchArea}>
                      <Search
                        size={layout === 'desktop' ? 'sm' : 'xl'}
                        className={styles.patientSearchInput}
                        placeholder={t('searchForPatient', 'Search for a patient by name or identifier number')}
                        labelText=""
                        autoFocus={true}
                      />
                      <Button kind="ghost" size={layout === 'desktop' ? 'small' : 'default'}>
                        {t('clear', 'Clear')}
                      </Button>

                      <Button className={styles.searchButton} size={layout === 'desktop' ? 'small' : 'default'}>
                        {t('search', 'Search')}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={`bx--row  ${styles.searchBox}`}>
                  <Tile light className={styles.searchText}>
                    <div className={styles.searchContent}>
                      <div className={styles.search}>
                        <div className={styles.search__circle}>
                          <UserFilled16 className={styles.userIcon} />
                        </div>
                        <div className={styles.search__rectangle}></div>
                      </div>
                      <p className={styles.searchPatient}>Search for a patient</p>
                      <p> Type a patient's name or </p> <b></b>
                      <p> unique ID number</p>
                    </div>
                  </Tile>

                  <div className={styles.searchText}>
                    <h5 className={styles.h5}>
                      <span className={styles.span}> or</span>
                    </h5>
                  </div>

                  <Button
                    kind="ghost"
                    renderIcon={Search32}
                    iconDescription="Advanced Search"
                    onClick={() => {
                      setAdvancedOpen(true);
                      setOpen(false);
                    }}>
                    {t('advancedSearch', 'Advanced Search')}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {advancedOpen && (
            // <PatientAdvancedSearchLaunch close={close} />

            <div>
              <div className={styles.backButtonSet}>
                <ArrowLeft32
                  className={styles.backButton}
                  onClick={() => {
                    setOpen(true);
                    setAdvancedOpen(false);
                  }}
                />
                <Button
                  kind="ghost"
                  tooltipAlignment="start"
                  onClick={() => {
                    setOpen(true);
                    setAdvancedOpen(false);
                  }}>
                  {' '}
                  {t('backToSimpleSearch', 'Back to simple search')}
                </Button>
              </div>

              <div className={styles.searchFormTitle}>
                <span> Match </span>
                <ContentSwitcher className={styles.searchSwitch} onChange={console.log}>
                  <Switch name={'any'} text="Any" />
                  <Switch name={'all'} text="All" />
                </ContentSwitcher>
                <span> of the following fields : </span>
              </div>

              <Form>
                <div className={styles.searchPatient}>
                  <label> Name </label>
                </div>

                <div className={styles.searchFormStyle}>
                  <TextInput
                    light
                    id="fname"
                    labelText="First Name"
                    onChange={(event) => {
                      setFName(event.target.value);
                    }}
                  />
                </div>

                <div className={styles.searchFormStyle}>
                  <TextInput
                    light
                    id="mname"
                    labelText="Middle Name"
                    onChange={(event) => {
                      setMName(event.target.value);
                    }}
                  />
                </div>

                <div className={styles.searchFormStyle}>
                  <TextInput
                    light
                    id="lname"
                    labelText="Last Name"
                    onChange={(event) => {
                      setLName(event.target.value);
                    }}
                  />
                </div>

                <div className={styles.searchPatient}>
                  <label> Personal Details</label>
                </div>
                <div className={styles.searchFormStyle}>
                  <span> Sex</span>
                  <ContentSwitcher onChange={console.log}>
                    <Switch name={'any'} text="Any" />
                    <Switch name={'male'} text="Male" />
                    <Switch name={'female'} text="Female" />
                  </ContentSwitcher>
                </div>

                <div className={styles.searchFormStyle}>
                  <DatePicker dateFormat="m/d/Y" datePickerType="simple" light>
                    <DatePickerInput
                      id="dob"
                      placeholder="mm/dd/yyyy"
                      labelText="Date of Birth"
                      type="date"
                      onChange={(event) => {
                        setDob(event.target.value);
                      }}
                    />
                  </DatePicker>
                </div>

                <div className={styles.searchFormStyle}>
                  <TextInput
                    light
                    id="pnumber"
                    labelText="Phone Number"
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                  />
                </div>

                <div className={styles.searchFormStyle}>
                  <TextInput
                    light
                    id="postcode"
                    labelText="Post Code"
                    onChange={(event) => {
                      setPostalCode(event.target.value);
                    }}
                  />
                </div>

                <div className={styles.searchPatient}>
                  <label> Last Visit</label>
                </div>
                <DatePicker dateFormat="m/d/Y" datePickerType="simple" light className={styles.searchFormStyle}>
                  <DatePickerInput
                    id="lastvisit"
                    placeholder="mm/dd/yyyy"
                    labelText="Last Visit"
                    type="date"
                    onChange={(event) => {
                      setLastVisit(event.target.value);
                    }}
                  />
                </DatePicker>
              </Form>

              <div className={styles.buttonsGroup}>
                <Button kind="secondary" size="lg">
                  {' '}
                  {t('cancel', 'Cancel')}
                </Button>
                <Button size="lg" onClick={() => handleNewSearch()}>
                  {t('save', 'Save')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Overlay>
    </>
  );
};

export default PatientSearchLaunch;
