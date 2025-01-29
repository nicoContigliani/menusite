import React, { useState } from 'react'
import styles from './Licence.module.css'
import CheckBoxComponents from '../CheckBox/CheckBoxComponents'
const Licence = (props: any) => {
    const { labelCheck, setLabelCheck, checked, setChecked }: any = props


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contrato de Uso de la Plataforma de Menú Online</h1>

            <span className={styles.clause}>Este Contrato de Uso (en adelante, el "Contrato") regula el acceso y la utilización de la plataforma de menú online (en adelante, "la Plataforma") proporcionada por [Nombre de tu Empresa/Razón Social], con domicilio en [Tu Domicilio] y CIF/NIF [Tu CIF/NIF] (en adelante, "la Empresa"), por parte del usuario (en adelante, "el Usuario"), cuyos datos se especifican en el formulario de registro.</span>

            <h2 className={styles.subtitle}>I. Definiciones</h2>
            <span className={styles.clause}>
                <span className={styles.emphasis}>Plataforma:</span> El sistema online proporcionado por la Empresa para la creación, gestión y visualización de menús online.<br />
                <span className={styles.emphasis}>Usuario:</span> La persona física o jurídica que utiliza la Plataforma, habiendo aceptado los términos del presente Contrato.<br />
                <span className={styles.emphasis}>Contenido:</span> Cualquier información, texto, imagen, fotografía, video o cualquier otro material subido a la Plataforma por el Usuario.<br />
                <span className={styles.emphasis}>Contenido Ilegal:</span> Contenido que infringe la legislación vigente, los derechos de terceros o las disposiciones del presente Contrato.
            </span>

            <h2 className={styles.subtitle}>II. Objeto</h2>
            <span className={styles.clause}>El presente Contrato tiene por objeto regular las condiciones de uso de la Plataforma por parte del Usuario, permitiéndole crear, gestionar y mostrar menús online a sus clientes.</span>

            <h2 className={styles.subtitle}>III. Uso Aceptable y Restricciones de Contenido</h2>
            <span className={styles.clause}>El Usuario se compromete a no utilizar la Plataforma para publicar, transmitir o distribuir Contenido que:</span>
            <ul className={styles.list}> {/* Asumiendo que tienes un estilo .list en tu CSS */}
                <li>Infrinja derechos de propiedad intelectual, industrial o de cualquier otra naturaleza.</li>
                <li>Sea difamatorio, injurioso, calumnioso, obsceno, pornográfico, xenófobo, racista o que atente contra los derechos fundamentales de las personas.</li>
                <li>Sea ilegal, dañino, amenazante, abusivo, acosador o invasivo de la privacidad de terceros.</li>
                <li>Contenga virus informáticos, malware o cualquier otro código malicioso.</li>
                <li>Promueva actividades ilegales o contrarias a la moral y al orden público.</li>
                <li>Suplante la identidad de otra persona o entidad.</li>
                <li>Contenga datos personales de terceros sin su consentimiento expreso.</li>
            </ul>

            <h2 className={styles.subtitle}>IV. Responsabilidades del Usuario</h2>
            <span className={styles.clause}>El Usuario es el único responsable del Contenido que sube a la Plataforma y garantiza su exactitud, veracidad y legalidad. El Usuario se compromete a indemnizar y mantener indemne a la Empresa frente a cualquier reclamación, demanda o sanción derivada del Contenido que haya publicado.</span>

            <h2 className={styles.subtitle}>V. Derechos de la Empresa</h2>
            <span className={styles.clause}>La Empresa se reserva el derecho de:</span>
            <ul className={styles.list}>
                <li>Moderar, editar o eliminar cualquier Contenido que considere que infringe el presente Contrato o la legislación vigente.</li>
                <li>Suspender o cancelar la cuenta del Usuario en caso de incumplimiento del Contrato.</li>
                <li>Modificar la Plataforma y sus funcionalidades en cualquier momento.</li>
                <li>Cooperar con las autoridades competentes en caso de investigaciones relacionadas con el uso de la Plataforma.</li>
            </ul>

            <h2 className={styles.subtitle}>VI. Protección de Datos Personales</h2>
            <span className={styles.clause}>La Empresa se compromete a tratar los datos personales del Usuario de acuerdo con la legislación vigente en materia de protección de datos. La información detallada sobre el tratamiento de datos se encuentra disponible en la <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">Política de Privacidad</a> de la Empresa.</span>

            <h2 className={styles.subtitle}>VII. Exclusión de Garantías y Limitación de Responsabilidad</h2>
            <span className={styles.clause}>La Empresa no garantiza la disponibilidad ininterrumpida ni el funcionamiento perfecto de la Plataforma. La Empresa no será responsable por daños y perjuicios derivados del uso de la Plataforma, salvo en casos de dolo o culpa grave.</span>

            <h2 className={styles.subtitle}>VIII. Duración y Terminación</h2>
            <span className={styles.clause}>El presente Contrato entra en vigor en el momento de la aceptación por parte del Usuario y tendrá una duración indefinida, salvo que se acuerde lo contrario. Cualquiera de las partes podrá resolver el Contrato mediante notificación escrita con [Número] días de antelación.</span>

            <h2 className={styles.subtitle}>IX. Ley Aplicable y Jurisdicción</h2>
            <span className={styles.clause}>El presente Contrato se rige por la legislación de [País/Región]. Cualquier controversia que surja en relación con el Contrato se someterá a los tribunales de [Ciudad].</span>

            <div className={styles.warning}>
                <CheckBoxComponents
                    labelCheck={labelCheck}
                    setLabelCheck={setLabelCheck}
                    checked={checked}
                    setChecked={setChecked}
                />
            </div>

        </div>
    )
}

export default Licence