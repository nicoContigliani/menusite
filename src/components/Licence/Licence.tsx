import React, { useEffect, useState } from 'react';
import styles from './Licence.module.css';
import CheckBoxComponents from '../CheckBox/CheckBoxComponents';

const Licence = (props: any) => {
    const { labelCheck, setLabelCheck, checked, setChecked, setCurrent }: any = props;

    useEffect(() => {
        if (checked) setCurrent(4);
    }, [checked]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contrato de Licencia y Uso de la Plataforma de Menú Digital</h1>

            <span className={styles.clause}>
                Este Contrato de Licencia y Uso (en adelante, el "Contrato") regula el acceso, la utilización y los derechos sobre la plataforma de menú digital (en adelante, "la Plataforma"), propiedad de <strong>LlakaScript</strong>, con domicilio en <strong>[Dirección de la Empresa]</strong> y CIF/NIF <strong>[CIF/NIF de la Empresa]</strong> (en adelante, "el Licenciante"), por parte del usuario (en adelante, "el Usuario"), cuyos datos se especifican en el formulario de registro. Al aceptar este Contrato, el Usuario reconoce haber leído, entendido y aceptado todas sus cláusulas.
            </span>

            <h2 className={styles.subtitle}>I. Definiciones</h2>
            <span className={styles.clause}>
                <span className={styles.emphasis}>Plataforma:</span> Sistema digital propiedad de <strong>LlakaScript</strong>, que permite la creación, gestión y visualización de menús digitales de manera intuitiva y eficiente.<br />
                <span className={styles.emphasis}>Usuario:</span> Persona física o jurídica que utiliza la Plataforma bajo los términos de este Contrato.<br />
                <span className={styles.emphasis}>Contenido:</span> Cualquier información, texto, imagen, fotografía, video u otro material proporcionado por el Usuario en la Plataforma.<br />
                <span className={styles.emphasis}>Licencia:</span> Autorización no exclusiva, intransferible y revocable otorgada por <strong>LlakaScript</strong> al Usuario para utilizar la Plataforma conforme a los términos de este Contrato.
            </span>

            <h2 className={styles.subtitle}>II. Objeto</h2>
            <span className={styles.clause}>
                El presente Contrato tiene por objeto establecer los términos y condiciones bajo los cuales <strong>LlakaScript</strong> otorga al Usuario una licencia limitada para utilizar la Plataforma, así como regular el uso aceptable de la misma. La Plataforma está diseñada para facilitar la gestión de menús digitales de manera eficiente y profesional.
            </span>

            <h2 className={styles.subtitle}>III. Licencia de Uso</h2>
            <span className={styles.clause}>
                <strong>LlakaScript</strong> concede al Usuario una licencia no exclusiva, intransferible y revocable para utilizar la Plataforma, exclusivamente para fines comerciales internos y de acuerdo con los términos de este Contrato. Queda expresamente prohibido:
            </span>
            <ul className={styles.list}>
                <li>Modificar, copiar, distribuir o reproducir la Plataforma total o parcialmente sin autorización expresa por escrito de <strong>LlakaScript</strong>.</li>
                <li>Utilizar la Plataforma para fines ilegales, no autorizados o que infrinjan los derechos de terceros.</li>
                <li>Sublicenciar, vender, alquilar o comercializar el acceso a la Plataforma.</li>
                <li>Realizar ingeniería inversa, descompilar o desmontar la Plataforma, excepto cuando la ley lo permita expresamente.</li>
            </ul>

            <h2 className={styles.subtitle}>IV. Uso Aceptable y Restricciones de Contenido</h2>
            <span className={styles.clause}>
                El Usuario se compromete a utilizar la Plataforma de manera responsable y a no publicar, transmitir o distribuir Contenido que:
            </span>
            <ul className={styles.list}>
                <li>Infrinja derechos de propiedad intelectual, industrial o de cualquier otra naturaleza.</li>
                <li>Sea difamatorio, injurioso, obsceno, xenófobo, racista o que atente contra los derechos fundamentales de las personas.</li>
                <li>Promueva actividades ilegales, fraudulentas o contrarias al orden público.</li>
                <li>Contenga virus informáticos, malware o cualquier otro código malicioso.</li>
                <li>Suplante la identidad de otra persona o entidad.</li>
                <li>Incluya datos personales de terceros sin su consentimiento expreso.</li>
            </ul>

            <h2 className={styles.subtitle}>V. Responsabilidades del Usuario</h2>
            <span className={styles.clause}>
                El Usuario es el único responsable del Contenido que sube a la Plataforma y garantiza su exactitud, veracidad y legalidad. El Usuario se compromete a indemnizar y mantener indemne a <strong>LlakaScript</strong> frente a cualquier reclamación, demanda o sanción derivada del Contenido que haya publicado o de cualquier incumplimiento de este Contrato.
            </span>

            <h2 className={styles.subtitle}>VI. Derechos del Licenciante</h2>
            <span className={styles.clause}>
                <strong>LlakaScript</strong> se reserva el derecho de:
            </span>
            <ul className={styles.list}>
                <li>Moderar, editar o eliminar cualquier Contenido que infrinja este Contrato o la legislación vigente.</li>
                <li>Suspender o cancelar la cuenta del Usuario en caso de incumplimiento del Contrato.</li>
                <li>Modificar la Plataforma y sus funcionalidades en cualquier momento, notificando al Usuario con antelación razonable.</li>
                <li>Cooperar con las autoridades competentes en investigaciones relacionadas con el uso de la Plataforma.</li>
            </ul>

            <h2 className={styles.subtitle}>VII. Protección de Datos Personales</h2>
            <span className={styles.clause}>
                <strong>LlakaScript</strong> tratará los datos personales del Usuario de acuerdo con la legislación vigente en materia de protección de datos, en particular el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPD-GDD). El Usuario consiente expresamente que sus datos personales sean utilizados para fines corporativos, incluyendo, pero no limitándose a, marketing, análisis de datos y mejora de servicios. Para más información, consulte nuestra <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.
            </span>

            <h2 className={styles.subtitle}>VIII. Exclusión de Garantías y Limitación de Responsabilidad</h2>
            <span className={styles.clause}>
                <strong>LlakaScript</strong> no garantiza la disponibilidad ininterrumpida ni el funcionamiento perfecto de la Plataforma. En la máxima medida permitida por la ley, <strong>LlakaScript</strong> no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de la Plataforma, incluyendo, pero no limitándose a, pérdida de beneficios, interrupción del negocio o pérdida de datos.
            </span>

            <h2 className={styles.subtitle}>IX. Duración y Terminación</h2>
            <span className={styles.clause}>
                Este Contrato entra en vigor en el momento de su aceptación por parte del Usuario y tendrá una duración indefinida. Cualquiera de las partes podrá resolver el Contrato mediante notificación escrita con <strong>30 días</strong> de antelación. En caso de incumplimiento grave por parte del Usuario, <strong>LlakaScript</strong> podrá rescindir el Contrato de inmediato.
            </span>

            <h2 className={styles.subtitle}>X. Ley Aplicable y Jurisdicción</h2>
            <span className={styles.clause}>
                Este Contrato se rige por la legislación de <strong>España</strong>. Cualquier controversia derivada del mismo se someterá a los tribunales de <strong>[Ciudad]</strong>, con renuncia expresa a cualquier otro fuero que pudiera corresponder.
            </span>

            <div className={styles.warning}>
                <CheckBoxComponents
                    labelCheck={labelCheck}
                    setLabelCheck={setLabelCheck}
                    checked={checked}
                    setChecked={setChecked}
                />
            </div>
        </div>
    );
};

export default Licence;