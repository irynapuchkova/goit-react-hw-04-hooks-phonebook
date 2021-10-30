import styled from '@emotion/styled';

export const Contacts = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
`;
export const ContactToAdd = styled.li`
  max-width: 380px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  margin-bottom: 5px;
  font-size: 20px;
  border-bottom: 1px solid grey;
  color: #5a4343;
  background: linear-gradient(to left, #ebc785 0%, white, #e4a736);
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);
`;
