import GitHubIcon from './icons/GitHub';

export default function Footer() {
  return(
    <footer className="footer">
      <div className="footer__body">
        <div className="mbe-1">
          <span>Developed by </span>
          <a href="https://github.com/edwin-shdw" target="_blank">edwin-shdw</a>
        </div>
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
