import githubLogo from '../../github-logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900  py-2 w-full flex justify-self-end self-end ">
      <div className="container-general">
        <a href="https://github.com/lucianomazzuca" rel="noreferrer" target="_blank" className="">
          <div className="wrapper flex items-center justify-center h-full md:justify-end hover:text-indigo-500 ">
            <img src={githubLogo} alt="Github logo" className="" />
            <span className="text-white mx-4 text-lg">lucianomazzuca</span>
          </div>
        </a>
      </div>
    </footer>
  );
}
 
export default Footer;