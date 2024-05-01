
import MessagesList from '../../../components/List/hocs/MessagesList';

import { PropertiesContainer } from './styles';

const MessagesPageList = () => {
  /**
   * Action buttons.
  */
  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      <MessagesList />
    </PropertiesContainer>
  );
};

export default MessagesPageList;