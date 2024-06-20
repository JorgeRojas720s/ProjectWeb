# Proyecto Progra IV

---

Para correr el proyecto, sigue estos pasos:

1. En la carpeta deseada, ejecuta el siguiente comando para clonar el repositorio:
    ```bash
    git clone https://github.com/JorgeRojas720s/ProjectWeb.git
    ```

2. Luego, instala las dependencias del proyecto con el siguiente comando:
    ```bash
    npm i
    ```

3. Después de instalar las dependencias, inicia el servidor con el siguiente comando:
    ```bash
    npm run dev
    ```

<details>
  <summary>Script BD</summary>

## Script BD
```bash

use db_project_web;
INSERT INTO tbl_events (eve_title, eve_description) VALUES
( 'Que no se pueda cumplir satisfactoriamente el Objetivo', ''),
( 'Que no se pueda cumplir satisfactoriamente el Objetivo General del Programa Nacional de la  Red de Cuido y desarrollo Infantil en el Cantón de Pérez Zeledón.', ''),
('Que no se pueda cumplir satisfactoriamente el Objetivo General del Programa Nacional de la  Red de Cuido y desarrollo Infantil en el Cantón de Pérez Zeledón.', ''),
('Que no se pueda cumplir satisfactoriamente el Objetivo General del Programa Nacional de la  Red de Cuido y desarrollo Infantil en el Cantón de Pérez Zeledón.', '');

INSERT INTO tbl_consequences (con_consequence) VALUES
('Que por falta de Inducción no se reciban las indicaciones  forma clara y precisa, por parte de los óganos asesores y se cometan errores que generen atrasos o suspensiones en los procesos inherentes a los Proyectos de Red de Cuido.'),
('Que se requiera de obras o insumos adicionales a los girados por el Gobierno Central y que la Administración no cuente con los recursos necesarios arriesgando el futuro de los proyectos de la Red de Cuido.'),

('Que por falta de Inducción no se reciban las indicaciones  forma clara y precisa, por parte de los óganos asesores y se cometan errores que generen atrasos o suspensiones en los procesos inherentes a los Proyectos de Red de Cuido'),
('Que la Administración no designe el personal óptimo para desarrollar los procesos y profesionales que conlleva y requiere el proyecto'),
('Que se requiera de obras o insumos adicionales a los girados por el Gobierno Central y que la Administración no cuente con los recursos necesarios arriesgando el futuro de los proyectos de la Red de Cuido'),
('Que el IMAS no cuente con los recursos necesarios para girar el susbsidio que se requiere en la Red de Cuido Infantil para llevar a cabo la operación del CECUDI y sufragar las necesidades básicas del mismo'),
('Que las causas descritas generen incumplimiento de los requisitos que deben cumplirse para el giro que los recursos por FODSESAF, los cuales son necesarios para el CECUDI y como consecuencia no se relice la transferencia por parte del Gobierno Central y no se pueda llevar a cabo el proyecto, en cualquiera de sus etapas'),

('Que el IMAS no cuente con los recursos necesarios para girar el susbsidio que se requiere en la Red de Cuido Infantil para llevar a cabo la operación del CECUDI y sufragar las necesidades básicas del mismo.'),
('Que se requiera de obras o insumos adicionales a los girados por el Gobierno Central y que la Administración no cuente con los recursos necesarios arriesgando el futuro de los proyectos de la Red de Cuido.'),
('Que las causas descritas generen incumplimiento de los requisitos que deben cumplirse para el giro que los recursos por FODSESAF, los cuales son necesarios para el CECUDI y como consecuencia no se relice la transferencia por parte del Gobierno Central y no se pueda llevar a cabo el proyecto, en cualquiera de sus etapas.'),

('Que se requiera de obras o insumos adicionales a los girados por el Gobierno Central y que la Administración no cuente con los recursos necesarios arriesgando el futuro de los proyectos de la Red de Cuido.'),
('Que el IMAS no cuente con los recursos necesarios para girar el susbsidio que se requiere en la Red de Cuido Infantil para llevar a cabo la operación del CECUDI y sufragar las necesidades básicas del mismo.'),
('Que las causas descritas generen incumplimiento de los requisitos que deben cumplirse para el giro que los recursos por FODSESAF, los cuales son necesarios para el CECUDI y como consecuencia no se relice la transferencia por parte del Gobierno Central y no se pueda llevar a cabo el proyecto, en cualquiera de sus etapas.')
;

INSERT INTO tbl_causes (cau_cause, cau_fk_event) VALUES
('Falta de Inducción', 1),
('Falta de Recurso Humano', 1),
('Por falta de voluntad política del Gobierno Central o Local no se cuente con los Recursos necesarios para el Desarrollo de los proyectos.', 1),
('Falta de Recursos Económicos Externos', 1),
('Falta de Voluntad Política', 1),
('Falta de Voluntad Interinstitucional', 1),

('Falta de Inducción', 2),
('Falta de Recurso Humano', 2),
('Por falta de voluntad política del Gobierno Central o Local no se cuente con los Recursos necesarios para el Desarrollo de los proyectos', 2),
('Falta de Recursos Económicos Externos', 2),
('Falta de Voluntad Política', 2),
('Falta de Voluntad Interinstitucional', 2),

('Falta de Recursos Económicos Externos', 3),
('Por falta de voluntad política del Gobierno Central o Local no se cuente con los Recursos necesarios para el Desarrollo de los proyectos.', 3),
('Falta de Voluntad Política', 3),
('Falta de Voluntad Interinstitucional', 3),

('Por falta de voluntad política del Gobierno Central o Local no se cuente con los Recursos necesarios para el Desarrollo de los proyectos.', 4),
('Falta de Recursos Económicos Externos', 4),
('Falta de Voluntad Política', 4),
('Falta de Voluntad Interinstitucional', 4)
;


INSERT INTO tbl_causes_x_consequences (cxc_fk_causes, cxc_fk_consequences) VALUES
(1, 1),
(2, null),
(3,2),
(4, null),
(5, null),
(6, null),
(7, 3),
(8, 4),
(9, 5),
(10, 6),
(11, 7),
(12, 7), 
(13, 8),
(14, 9),
(15, 10),
(16, 10),
(17, 11),
(18, 12),
(19, 13),
(20, 13)
;

INSERT INTO tbl_risk_classifications (rcf_classification, rcf_fk_consequences) VALUES 
('INTERNO', 1),
('EXTERNO', 1),
('INTERNO', 2),
('INTERNO', 3),
('EXTERNO', 4),
('EXTERNO', 5),
('EXTERNO', 6)
;


INSERT INTO tbl_risk_categories (rcg_category, rcg_fk_classification) VALUES 
('Procedimientos', 1),
('Recursos Humanos', 1), 
('Legales', 2),
('PROCEDIMIENTOS', 3),
('ESTRATÉGICOS', 4),
('FINANCIEROS', 4),
('FINANCIEROS', 5),
('FINANCIEROS', 6),
('FINANCIEROS', 7)
;

INSERT INTO tbl_risk_descriptions (rdc_description, rdc_fk_category) VALUES 
('Falta de Manuales de Procedimientos', 1),
('Falta de Inducción', 2), 
('Falta de Capacitación', 2), 
('Desconocimiento de Normas', 3),
('Falta de Capacitación', 4),
('Políticas de Concejo Municipal', 5),
('Limitación de Recursos', 6),
('Dependencia Económica', 7),
('Atrasos en los desembolsos para el desarrollo de proyectos', 7),
('Atrasos en los desembolsos para el desarrollo de proyectos', 8),
('Atrasos en los desembolsos para el desarrollo de proyectos', 9)
;

INSERT INTO tbl_control_measures (ctm_fcm_probability, ctm_fcm_impact,	ctm_fcm_risk_level, ctm_wcm_existing, ctm_wcm_attitude, ctm_wcm_aptitude, ctm_wcm_risk_level, ctm_wcm_acceptability, ctm_fk_consequences) VALUES (2, 2, 'Medio', 'Aplicar todos los medios humanos y tecnologicos para estar al día en todos los procesos de inducciòn y actualización existentes', '+', '+', 'Bajo', 'Se acepta', 3),
(1, 2, 'Bajo', 'Mantener e insistir en las Autoridades Locales sobre  la importancia e impacto social de este proyecto evidenciando la necesidad de asignar personal apto y comprometido con el proyecto. CECUDI', '+', '+', 'Bajo', 'Se acepta', 4),
(2, 3, 'Medio', 'Cuando existe un riesgo de que los recursos no sean suficientes para completar la obra, se acude a la Alcaldía, que hasta la fecha ha brindado apoyo total a la obra y ya se han efectuado inversiones significativas en el Prpoyecto con recursos propios.', '+', '+', 'Medio', 'No se acepta', 5),
(2, 3, 'Medio', 'Hasta la fecha el Gobierno Central ha manifestado todo el apoyo y anuencia para continuar con el presupuesto y giro a los de estos recursos a los Gobiernos Locales para desarrollar los CECUDI en el país.', '-', '-', 'Alto', 'No se acepta', 6),
(1, 3, 'Bajo', 'Tomar con suficiente responsabilidad y actitud cada uno de los procesos y requisitos que deben cumplirse para desarrollar este Proyecto.', '+', '-', 'Medio', 'No se acepta', 7);

INSERT INTO tbl_proposed_actions (
    pda_action,
     pda_fk_consequences
     ) VALUES 
('Identificar la normativa que señale las obligaciones que debe cumplir  el IMAS y aquellas entidades estatales responsables del desarrollo del Proyecto del CECUDI en el Cantón de Pérez Zeledón.', 8), 
('Transferir a la Alcaldía Municipal, con el fin de iniciar el procesos de consecución de recursos,  el costo al que ascienden las obras que no se encuentran presupuestadas en los recursos que gira FODESAF y que son estrictamente necesarios para  completar el costo faltante de la obra. ', 9),
('Atender todos los factores internos y externos que incrementen el riesgo de que no se pueda llevar a cabo el Proyecto.', 10),
('Acudir a las instancias gubernamentales y locales que permitan, asguren  y agilicen el giro de los recursos que se requieren para la sostenibilidad del CECUDI', 11),
('Acudir a las instancias gubernamentales y locales que permitan, asguren  y agilicen el giro de los recursos que se requieren para la sostenibilidad del CECUDI', 12),
('Participar en todos los eventos que sea posible relacionados a la normativa, procesos, experiencias y otros que propicie el Órgano Asesor de la Secretarìa Técnica de la Red de Cuido Infantil.', 13),
('Participar en todos los eventos que sea posible relacionados a la normativa, procesos, experiencias y otros que propicie el Órgano Asesor de la Secretarìa Técnica de la Red de Cuido Infantil.', 13);

INSERT INTO tbl_followup_plans (fpp_id_responsible, fpp_date, fpp_indicator) VALUES 
('01', 31/12/2016, 'CECUDI  EN OPERACIÓN'),
('020', 27/2/2015,  'CECUDI  EN OPERACIÓN');

INSERT INTO tbl_end_action_plans (eap_compilance, eap_justification, eap_fk_proposed_action) VALUES 
('SÍ', 'Hemos trabajado en constante apego a las instancias gubernamentales y locales con el fin de asegurar el giro de los recursos necesarios para la sostenibilidad del CECUDI y hemos estado en constante contacto con el Órgano Asesor de la Secretarìa Técnica de la Red de Cuido Infantil con el propósito de estar actualizados con la normativa, procesos, experiencias relacionados a la Red de Cuido Infantil.', NULL);

INSERT INTO tbl_selected_actions (
    sda_action, 
    sda_fk_proposed_actions, 
    sda_fk_end_action_plan, 
    sda_fk_followup_plan
    ) VALUES
('Acudir a las instancias gubernamentales y locales que permitan, asguren  y agilicen el giro de los recursos que se requieren para la sostenibilidad del CECUDI', 1, NULL, 1),
('Acudir a las instancias gubernamentales y locales que permitan, asguren  y agilicen el giro de los recursos que se requieren para la sostenibilidad del CECUDI', 2, NULL, 1),
('Participar en todos los eventos que sea posible relacionados a la normativa, procesos, experiencias y otros que propicie el Órgano Asesor de la Secretarìa Técnica de la Red de Cuido Infantil.', 3, NULL, 1),

('Acudir a las instancias gubernamentales y locales que permitan, asguren  y agilicen el giro de los recursos que se requieren para la sostenibilidad del CECUDI', 4, 1, 2),
('Participar en todos los eventos que sea posible relacionados a la normativa, procesos, experiencias y otros que propicie el Órgano Asesor de la Secretarìa Técnica de la Red de Cuido Infantil.', 5, 1, 2);
```
  
</details>


## Creadores
```bash
Ismael Marchena Méndez
```
```bash
Jorge Rojas Mena
```
```bash
Fabian Arguedas León
```
