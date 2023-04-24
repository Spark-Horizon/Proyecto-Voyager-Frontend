import { CustomButton } from './CustomButton'

export const Footer = () => {
  const handleButtonClick = () => {
    alert('SÍ SIRVE AAAAAA!');
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; SparkHorizon</p>
          </div>
          <div className="col-md-6">
            <CustomButton text="Contáctanos" func={handleButtonClick} />
          </div>
        </div>
      </div>
    </footer>
  );
};
