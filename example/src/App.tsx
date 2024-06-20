import { useEffect, useState } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';
import { requestAuthorization, fetchStepsData } from 'alon-react';

const App = () => {
  const [steps, setSteps] = useState<number | null>(null);

  const handleRequestAuthorization = async () => {
    try {
      await requestAuthorization();
    } catch (error: any) {
      console.error('Authorization Error:', error);
    }
  };

  const handleFetchStepsData = async () => {
    const now = Date.now();
    const endDate = now;
    const startDate = new Date(now).setMonth(new Date(now).getMonth() - 1);

    try {
      const stepsData = await fetchStepsData(startDate, endDate);
      setSteps(stepsData);
    } catch (error: any) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    handleRequestAuthorization();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Fetch Steps Data" onPress={handleFetchStepsData} />
      {steps !== null && <Text style={styles.stepsText}>Steps: {steps}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stepsText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default App;
