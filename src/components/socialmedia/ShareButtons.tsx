import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    EmailShareButton,
    PinterestShareButton,
    RedditShareButton,
    TumblrShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramIcon,
    EmailIcon,
    PinterestIcon,
    RedditIcon,
    TumblrIcon,
} from 'react-share';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
    url: string; // URL que se compartirá
    title?: string; // Título por defecto
    size?: number; // Tamaño de los íconos
    round?: boolean; // Forma redonda o cuadrada
    className?: string; // Clase CSS adicional
    // Contenido personalizado para cada plataforma
    facebookContent?: string;
    twitterContent?: string;
    linkedinContent?: string;
    whatsappContent?: string;
    telegramContent?: string;
    emailContent?: string;
    pinterestContent?: string;
    redditContent?: string;
    tumblrContent?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
    url,
    title = '',
    size = 32,
    round = true,
    className = '',
    facebookContent = '',
    twitterContent = '',
    linkedinContent = '',
    whatsappContent = '',
    telegramContent = '',
    emailContent = '',
    pinterestContent = '',
    redditContent = '',
    tumblrContent = '',
}) => {
    return (
        <div className={`${styles.shareButtons} ${className}`}>
            {/* Facebook */}
            <FacebookShareButton
                url={url}
                hashtag={facebookContent ? `#${facebookContent}` : undefined}
            >
                <FacebookIcon size={size} round={round} />
            </FacebookShareButton>

            {/* Twitter */}
            <TwitterShareButton url={url} title={twitterContent || title}>
                <TwitterIcon size={size} round={round} />
            </TwitterShareButton>

            {/* LinkedIn */}
            <LinkedinShareButton url={url} title={linkedinContent || title}>
                <LinkedinIcon size={size} round={round} />
            </LinkedinShareButton>

            {/* WhatsApp */}
            <WhatsappShareButton url={url} title={whatsappContent || title}>
                <WhatsappIcon size={size} round={round} />
            </WhatsappShareButton>

            {/* Telegram */}
            <TelegramShareButton url={url} title={telegramContent || title}>
                <TelegramIcon size={size} round={round} />
            </TelegramShareButton>

            {/* Email */}
            <EmailShareButton url={url} subject={title} body={emailContent || title}>
                <EmailIcon size={size} round={round} />
            </EmailShareButton>

            {/* Pinterest */}
            <PinterestShareButton url={url} media={pinterestContent || ''}>
                <PinterestIcon size={size} round={round} />
            </PinterestShareButton>

            {/* Reddit */}
            <RedditShareButton url={url} title={redditContent || title}>
                <RedditIcon size={size} round={round} />
            </RedditShareButton>

            {/* Tumblr */}
            <TumblrShareButton url={url} title={tumblrContent || title}>
                <TumblrIcon size={size} round={round} />
            </TumblrShareButton>
        </div>
    );
};

export default ShareButtons;


// const shareUrl = 'https://www.example.com';
// const shareTitle = 'Check out this amazing website!';

{/* <ShareButtons
    url={shareUrl}
    title={shareTitle}
    size={40}
    round={false}
    className="custom-class"
    facebookContent="¡Mira este increíble sitio web en Facebook!"
    twitterContent="¡Echa un vistazo a este sitio web en Twitter!"
    linkedinContent="Descubre este sitio web en LinkedIn."
    whatsappContent="¡Mira este sitio web en WhatsApp!"
    telegramContent="¡Comparte este sitio web en Telegram!"
    emailContent="Te recomiendo este sitio web. ¡Échale un vistazo!"
    pinterestContent="https://www.example.com/image.jpg"
    redditContent="¡Mira este sitio web en Reddit!"
    tumblrContent="¡Comparte este sitio web en Tumblr!"
/> */}