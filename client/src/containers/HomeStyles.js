import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Navigation = styled.div`
  width: 220px !important;
  flex-shrink: 0;
  background: #fff;
`;
export const Body = styled.div`
  padding: 12px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

export const ExampleContainer = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
`;

export const ExampleNavigation = styled(Navigation)`
  margin-right: 4px;
`;

export const ExampleBody = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: 50%;
`;
