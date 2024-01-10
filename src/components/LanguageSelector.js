import { Form, Dropdown } from 'react-bootstrap';

const LanguageSelector = (props) => {

  const {userLocale,setUserLocale } = props;    

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
  ];

  const handleLanguageChange = (languageCode) => {
    setUserLocale(languageCode);
  };

  return (
    <Form>
      <Form.Group controlId="languageSelector">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {languages.find((lang) => lang.code === userLocale).label}
          </Dropdown.Toggle>
          <Dropdown.Menu data-testid="dropdown-menu">
            {languages.map((language) => (
              <Dropdown.Item
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
              >
                {language.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
    </Form>
  );
};

export default LanguageSelector;
