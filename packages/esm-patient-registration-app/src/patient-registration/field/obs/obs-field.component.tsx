import { useConfig } from '@openmrs/esm-framework';
import { InlineNotification, Select, SelectItem } from 'carbon-components-react';
import { Field } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldDefinition, RegistrationConfig } from '../../../config-schema';
import { Input } from '../../input/basic-input/input/input.component';
import { ConceptResponse } from '../../patient-registration-types';
import { useConcept, useConceptAnswers } from '../field.resource';
import styles from './../field.scss';

export interface ObsFieldProps {
  fieldDefinition: FieldDefinition;
}

export function ObsField({ fieldDefinition }: ObsFieldProps) {
  const { data: concept, isLoading } = useConcept(fieldDefinition.uuid);
  const config = useConfig() as RegistrationConfig;

  if (!config.registrationObs.encounterTypeUuid) {
    console.error(
      'The registration form has been configured to have obs fields, ' +
        'but no registration encounter type has been configured. Obs fields ' +
        'will not be displayed.',
    );
    return null;
  }

  if (isLoading) {
    return null;
  }
  switch (concept.datatype.display) {
    case 'Text':
      return (
        <TextObsField
          concept={concept}
          validationRegex={fieldDefinition.validation.matches}
          label={fieldDefinition.label}
        />
      );
    case 'Numeric':
      return <NumericObsField concept={concept} label={fieldDefinition.label} />;
    case 'Coded':
      return (
        <CodedObsField
          concept={concept}
          answerConceptSetUuid={fieldDefinition.answerConceptSetUuid}
          label={fieldDefinition.label}
        />
      );
    default:
      return (
        <InlineNotification kind="error" title="Error">
          Concept has unknown datatype "{concept.datatype.display}"
        </InlineNotification>
      );
  }
}

interface TextObsFieldProps {
  concept: ConceptResponse;
  validationRegex: string;
  label: string;
}

function TextObsField({ concept, validationRegex, label }: TextObsFieldProps) {
  const { t } = useTranslation();

  const validateInput = (value: string) => {
    if (!value || !validationRegex || validationRegex === '' || typeof validationRegex !== 'string' || value === '') {
      return;
    }
    const regex = new RegExp(validationRegex);
    if (regex.test(value)) {
      return;
    } else {
      return t('invalidInput', 'Invalid Input');
    }
  };

  const fieldName = `obs.${concept.uuid}`;

  return (
    <div className={`${styles.customField} ${styles.halfWidthInDesktopView}`}>
      <Field name={fieldName} validate={validateInput}>
        {({ field, form: { touched, errors }, meta }) => {
          return (
            <Input
              id={fieldName}
              labelText={label ?? concept.display}
              light
              invalid={errors[fieldName] && touched[fieldName]}
              {...field}
            />
          );
        }}
      </Field>
    </div>
  );
}

interface NumericObsFieldProps {
  concept: ConceptResponse;
  label: string;
}

function NumericObsField({ concept, label }: NumericObsFieldProps) {
  const { t } = useTranslation();

  const fieldName = `obs.${concept.uuid}`;

  return (
    <div className={`${styles.customField} ${styles.halfWidthInDesktopView}`}>
      <Field name={fieldName}>
        {({ field, form: { touched, errors }, meta }) => {
          return (
            <Input
              id={fieldName}
              labelText={label ?? concept.display}
              light
              invalid={errors[fieldName] && touched[fieldName]}
              type="number"
              {...field}
            />
          );
        }}
      </Field>
    </div>
  );
}

interface CodedObsFieldProps {
  concept: ConceptResponse;
  answerConceptSetUuid?: string;
  label?: string;
}

function CodedObsField({ concept, answerConceptSetUuid, label }: CodedObsFieldProps) {
  const { data: conceptAnswers, isLoading: isLoadingConceptAnswers } = useConceptAnswers(
    answerConceptSetUuid ?? concept.uuid,
  );
  const fieldName = `obs.${concept.uuid}`;

  return (
    <div className={`${styles.customField} ${styles.halfWidthInDesktopView}`}>
      {!isLoadingConceptAnswers ? (
        <Field name={fieldName}>
          {({ field, form: { touched, errors }, meta }) => {
            return (
              <Select
                id={fieldName}
                name={fieldName}
                labelText={label ?? concept?.display}
                light
                invalid={errors[fieldName] && touched[fieldName]}
                {...field}>
                <SelectItem key={`no-answer-select-item-${fieldName}`} value={''} text="" />
                {conceptAnswers.map((answer) => (
                  <SelectItem key={answer.uuid} value={answer.uuid} text={answer.display} />
                ))}
              </Select>
            );
          }}
        </Field>
      ) : null}
    </div>
  );
}
