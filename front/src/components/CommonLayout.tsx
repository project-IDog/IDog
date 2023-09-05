import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const CommonLayout = ({ children }: any) => {
  return (
    <>
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'right', 'bottom', 'left']}>
                <ScrollView>
                  {children}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  
});

export default CommonLayout;