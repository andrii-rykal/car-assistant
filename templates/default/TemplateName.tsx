import styles from './TemplateName.module.scss';
import React, { FC } from 'react';

export interface TemplateNameProps {
  '0'?: '',
}

export const TemplateName: FC<TemplateNameProps> = () => (
  <div className={styles.templateName}>
    TemplateName Component
  </div>
);
