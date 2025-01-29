import React from 'react';
import styles from './ButtonDownloadFile.module.css';
import Link from 'next/link';

const ButtonDownloadFile = ({ fileurl, label }: { fileurl: string, label: string }) => {
    return (
        <Link className={styles.link} href={fileurl} download="archivo.xml">
            <button className={styles.button}>
                {label}
            </button>
        </Link>
    );
};

export default ButtonDownloadFile;