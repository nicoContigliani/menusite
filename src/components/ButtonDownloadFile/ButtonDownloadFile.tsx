import React from 'react';
import styles from './ButtonDownloadFile.module.css';
import Link from 'next/link';
import { Button } from 'antd';

const ButtonDownloadFile = ({ fileurl, label, className }: { fileurl: string, label: string, className?: string }) => {
    return (
        <Button className={styles.button}>
            <Link className={styles.link} href={fileurl} download="archivo.xml">
                {label}
            </Link>
        </Button>
    );
};

export default ButtonDownloadFile;