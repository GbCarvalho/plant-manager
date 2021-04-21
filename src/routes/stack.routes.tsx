import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIndentification";
import { Confirmation } from "../pages/Confirmation";

const stackRoutes = createStackNavigator();

const StackRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <stackRoutes.Screen name="Welcome" component={Welcome} />
      <stackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification}
      />
      <stackRoutes.Screen name="Confirmation" component={Confirmation} />
    </stackRoutes.Navigator>
  );
};

export default StackRoutes;
