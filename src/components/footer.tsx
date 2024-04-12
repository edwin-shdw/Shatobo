import GitHubIcon from './icons/GitHub';

export default function Footer() {
  return(
    <footer className="footer">
      <div className="footer__body">
        <a
          href="https://github.com/edwin-shdw/Shatobo"
          target="_blank"
        >
          <GitHubIcon className="mie-1" />
          <span>Source Code</span>
        </a>
      </div>
    </footer>
  );
}
