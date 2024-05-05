
import { messagesServiceThunk } from '../../../../reducers/messages/crud';

import { ROUTES } from '../../../../constants/routes';



import ListComponent from '../../index';

const MessagesList = () => {
  return <ListComponent
    title='Mensagens'
    primaryInfo='subject'
    secondaryInfo='message'
    footerPrimaryInfo='name'
    footerSecondaryInfo='email'
    onReducerSource={messagesServiceThunk}
    stateAppSelector={'messagesListReducer'}
    onPaginate={ROUTES.messagesList}
    // actionsComponent={(item: IMessageData) => <MessagesActionsMenu item={item} />}
    hideAvatar
  />;
};

export default MessagesList;
