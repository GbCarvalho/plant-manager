import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export const PlantSelect: React.FC = () => {
  const [environments, setEnvironments] = useState<EnviromentProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);

  function handleEnvironmentSelect(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === "all") {
      setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setPlants([...data]);
    setLoading(false);
    setLoadingMore(false);
  }

  // Fetching plants environments filter
  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );

      setEnvironments([{ key: "all", title: "Todos" }, ...data]);

      const filtered = plants.filter((plant) =>
        plant.environments.includes(environmentSelected)
      );

      setFilteredPlants(filtered);
    }

    fetchEnviroment();
  }, []);

  // Fetching plants
  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        <View style={styles.question}>
          <Text style={styles.questionTitle}>Em qual ambiente</Text>
          <Text style={styles.questionSubtitle}>
            você quer colocar sua planta?
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelect(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plantsContainer}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                color={colors.green}
                style={{ marginTop: 32 }}
              />
            ) : (
              <></>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 32,
  },
  question: {
    paddingTop: 32,
  },
  questionTitle: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 17,
    lineHeight: 23,
  },
  questionSubtitle: {
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    lineHeight: 23,
  },
  enviromentList: {
    height: 46,
    justifyContent: "center",
    paddingBottom: 5,
    marginVertical: 32,
    marginLeft: 32,
  },
  plantsContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
