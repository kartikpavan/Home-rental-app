import {
  AirVent,
  AlarmSmoke,
  Anvil,
  Bath,
  Beaker,
  Beef,
  Briefcase,
  CableCar,
  CandlestickChart,
  Castle,
  Cctv,
  CookingPot,
  Cross,
  Cuboid,
  DoorClosed,
  Fan,
  Fence,
  FlameKindling,
  Gem,
  Globe,
  Heater,
  Home,
  Microwave,
  Mountain,
  Palmtree,
  ParkingCircle,
  PawPrint,
  Refrigerator,
  Sailboat,
  Shell,
  ShowerHead,
  Snail,
  Snowflake,
  TreePine,
  Tv,
  Umbrella,
  Users,
  Warehouse,
  WashingMachine,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";

export const NavMenuItems = [
  {
    label: "Trip List",
    href: "/",
  },
  {
    label: "Wish List",
    href: "/",
  },
  {
    label: "Property List",
    href: "/",
  },
  {
    label: "Reservation List",
    href: "/",
  },
  {
    label: "Become a Host",
    href: "/",
  },
];

export const categories = [
  {
    label: "All",
    icon: Globe,
  },
  {
    img: "/images/beach.jpg",
    label: "Beachfront",
    icon: Wind,
    description: "This property is close to the beach!",
  },
  {
    img: "/images/windmill.jpg",
    label: "Windmills",
    icon: Fan,
    description: "This property is has windmills!",
  },
  {
    img: "/images/city.jpg",
    label: "Cities",
    icon: Warehouse,
    description: "This property is modern!",
  },
  {
    img: "/images/countryside.jpg",
    label: "Countryside",
    icon: Mountain,
    description: "This property is in the countryside!",
  },
  {
    img: "/images/pool.jpg",
    label: " Pools",
    icon: Waves,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "/images/island.jpg",
    label: "Islands",
    icon: Palmtree,
    description: "This property is on an island!",
  },
  {
    img: "assets/lake_cat.webp",
    label: "Lakefront",
    icon: Sailboat,
    description: "This property is near a lake!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "Skiing",
    icon: CableCar,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "Castles",
    icon: Castle,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "Caves",
    icon: Cuboid,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "Camping	",
    icon: TreePine,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/arctic_cat.webp",
    label: "Arctic",
    icon: Snowflake,
    description: "This property is in arctic environment!",
  },
  {
    img: "assets/desert_cat.webp",
    label: "Desert",
    icon: Snail,
    description: "This property is in the desert!",
  },
  {
    img: "assets/barn_cat.jpg",
    label: "Barns",
    icon: Shell,
    description: "This property is in a barn!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "Luxury",
    icon: Gem,
    description: "This property is brand new and luxurious!",
  },
];

export const placeTypes = [
  {
    name: "Entire place",
    value: "place",
    description: "Guests have the whole place to themselves",
    icon: Home,
  },
  {
    name: "Separate Rooms",
    value: "rooms",
    description: "Guests have their own room in a house, plus access to shared places",
    icon: DoorClosed,
  },
  {
    name: "Single Room",
    value: "single-room",
    description: "Guests sleep in a room or common area that maybe shared with you or others",
    icon: Users,
  },
];

export const facilities = [
  {
    name: "Bath tub",
    value: "BathTub",
    icon: Bath,
  },
  {
    name: "Personal care products",
    value: "PersonalCareProducts",
    icon: Beaker,
  },
  {
    name: "Outdoor shower",
    value: "OutdoorShower",
    icon: ShowerHead,
  },
  {
    name: "Washer",
    value: "Washer",
    icon: WashingMachine,
  },
  {
    name: "Hangers",
    value: "Hangers",
    icon: CandlestickChart,
  },
  {
    name: "Iron",
    value: "Iron",
    icon: Anvil,
  },
  {
    name: "TV",
    value: "TV",
    icon: Tv,
  },
  {
    name: "Dedicated workspace",
    value: "DedicatedWorkspace",
    icon: Briefcase,
  },
  {
    name: "Air Conditioning",
    value: "AirConditioning",
    icon: AirVent,
  },
  {
    name: "Heating",
    value: "Heating",
    icon: Heater,
  },
  {
    name: "Security cameras",
    value: "SecurityCameras",
    icon: Cctv,
  },
  {
    name: "Fire extinguisher",
    value: "FireExtinguisher",
    icon: AlarmSmoke,
  },
  {
    name: "First Aid",
    value: "FirstAid",
    icon: Cross,
  },
  {
    name: "Wifi",
    value: "Wifi",
    icon: Wifi,
  },
  {
    name: "Cooking set",
    value: "CookingSet",
    icon: CookingPot,
  },
  {
    name: "Refrigerator",
    value: "Refrigerator",
    icon: Refrigerator,
  },
  {
    name: "Microwave",
    value: "Microwave",
    icon: Microwave,
  },
  {
    name: "Barbecue grill",
    value: "BarbecueGrill",
    icon: Beef,
  },
  {
    name: "Outdoor dining area",
    value: "OutdoorDiningArea",
    icon: Umbrella,
  },
  {
    name: "Camp fire",
    value: "CampFire",
    icon: FlameKindling,
  },
  {
    name: "Garden",
    value: "Garden",
    icon: Fence,
  },
  {
    name: "Free parking",
    value: "FreeParking",
    icon: ParkingCircle,
  },
  {
    name: "Pet allowed",
    value: "PetAllowed",
    icon: PawPrint,
  },
];
