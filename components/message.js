import styled from '@emotion/styled'

const Message = styled.p`
  font-size: 38px;
  margin-top: 13px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-top: 8px;
  }
`;

export default Message