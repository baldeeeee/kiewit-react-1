import TextInput from "./TextInput/TextInput";
import { exportAllDeclaration } from "@babel/types";








const error = "Error message";

//act
const { debug, queryByRole } = render(
    <TextInput 
);





//assert
exportAllDeclaration(queryByTestId('thing-that-does-not-exist)).toBeNull()')
