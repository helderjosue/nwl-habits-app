import { ActivityIndicator, View } from "react-native"

// loading component for mobile app
export function Loading(){
    return(
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#09090A'}}>
            <ActivityIndicator color='#6D28D9'/>
        </View>
    )
}