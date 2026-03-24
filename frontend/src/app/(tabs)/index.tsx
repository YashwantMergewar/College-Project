import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface NavCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  bgClass: string;
  iconBgClass: string;
  href: string;
}

function NavCard({ title, subtitle, icon, bgClass, iconBgClass, href }: NavCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(href as any)}
      className={`flex-row items-center rounded-3xl p-5 mb-4 ${bgClass}`}
      style={{ elevation: 6, shadowColor: "#000", shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }}
    >
      <View className={`w-14 h-14 rounded-2xl justify-center items-center mr-4 ${iconBgClass}`}>
        <Ionicons name={icon} size={28} color="#fff" />
      </View>
      <View className="flex-1">
        <Text className="text-white text-lg font-bold">{title}</Text>
        <Text className="text-white/70 text-sm mt-0.5">{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.6)" />
    </TouchableOpacity>
  );
}

export default function Index() {
  const { user } = useAuth();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View className="flex-1 bg-slate-100">
      {/* ── Header ── */}
      <View
        className="bg-indigo-950 px-6 pt-9 pb-10 rounded-b-[36px]"
        style={{ elevation: 8, shadowColor: "#1e1b4b", shadowOpacity: 0.3, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}
      >
        {/* Badge */}
        <View className="self-start bg-white/10 rounded-full px-3 py-1 mb-4">
          <Text className="text-indigo-200 text-xs font-semibold tracking-widest uppercase">
            Dashboard
          </Text>
        </View>

        {/* Greeting */}
        <Text className="text-indigo-300 text-base font-medium">{greeting()},</Text>
        <Text className="text-white text-3xl font-extrabold mt-1" numberOfLines={1}>
          {user?.fullname ?? "User"} 👋
        </Text>

        {/* Role tag */}
        <View className="self-start bg-indigo-600 rounded-lg px-3 py-1 mt-3">
          <Text className="text-indigo-100 text-xs font-bold tracking-wide">{user?.role}</Text>
        </View>
      </View>

      {/* ── Cards Section ── */}
      <View className="flex-1 px-5 pt-7 pb-24">
        <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Navigate to
        </Text>

        <NavCard
          href="/student/StudentDetails"
          title="Students"
          subtitle="View & manage students"
          icon="school"
          bgClass="bg-indigo-600"
          iconBgClass="bg-indigo-800"
        />
        <NavCard
          href="/staff/StaffDetails"
          title="Teachers"
          subtitle="View & manage staff"
          icon="people"
          bgClass="bg-cyan-600"
          iconBgClass="bg-cyan-800"
        />
        <NavCard
          href="/mentor/MentorDetails"
          title="Mentors"
          subtitle="View & manage mentors"
          icon="person-circle"
          bgClass="bg-emerald-600"
          iconBgClass="bg-emerald-800"
        />
      </View>
    </View>
  );
}
