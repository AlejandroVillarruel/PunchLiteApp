import { LinearGradient } from "expo-linear-gradient";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../constants";
import { getAvatarUrl } from "../../utils";

const Avatar = ({ stories, avatar, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: "center",
        width: 103,
        height: 103,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
      disabled={stories.length === 0}
      onPress={onPress}
    >
      <LinearGradient
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 103,
          height: 103,
          borderRadius: 50,
          backgroundColor: colors.lightGrey,
        }}
        colors={stories.length !== 0 ? ["#d62976", "#fa7e1e", "#feda75"] : []}
      />
      <Image
        source={getAvatarUrl(avatar)}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </TouchableOpacity>
  );
};

const Line = () => {
  return (
    <View
      style={{
        borderTopWidth: 0.3,
        borderTopColor: colors.grey,
        width: "100%",
        marginVertical: 10,
      }}
    />
  );
};

const Label = ({ title }) => {
  return <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>;
};

const Option = ({ title, value, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {value}
      </Text>
      <Text style={{ color: colors.grey }}>{title}</Text>
    </TouchableOpacity>
  );
};

const Border = () => (
  <View
    style={{
      borderRightWidth: 0.3,
      height: "100%",
      width: 1,
    }}
  />
);

const desc =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const expertise =
  "• Bachelors of Science in Exercise Science Nottingham Trent 2017 • Certified Personal Trainer (CPT) • CPR and First Aid Certified";

const review = {
  id: "1",
  name: "John Doe",
  review: "I am happy with the service",
};

const trainers = [
  {
    _id: "1",
    name: "John Doe",
    destination: "Personal Trainer",
    rating: "4.5",
    reviews: "10",
    level: 2,
    distance: "2.5 km",
  },
  {
    _id: "2",
    name: "Jessica Doe",
    destination: "Personal Trainer",
    rating: "4.5",
    reviews: "10",
    level: 2,
    distance: "2.5 km",
  },
];

export {
  Avatar,
  Line,
  Label,
  Option,
  Border,
  desc,
  expertise,
  review,
  trainers,
};
