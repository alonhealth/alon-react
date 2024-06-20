import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'alon-react' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AlonReact = NativeModules.AlonReact
  ? NativeModules.AlonReact
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function requestAuthorization(): Promise<boolean> {
  return AlonReact.requestAuthorization();
}

export function fetchStepsData(
  startDate: number,
  endDate: number
): Promise<number> {
  return AlonReact.fetchStepsData(startDate, endDate);
}
