import React from 'react';
import styles from './TemplateName.module.scss';

export interface TemplateNameProps {}

export const TemplateName: React.FC<TemplateNameProps> = () => (
  <div className={styles.templateName}>
    TemplateName Component
  </div>
);
