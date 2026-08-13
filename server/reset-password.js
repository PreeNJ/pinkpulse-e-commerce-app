const bcrypt = require("bcrypt");
const prisma = require("./src/config/prisma");

async function resetPassword() {
  const email = "auth-test@pinkpulse.com";
  const newPassword = "Test123!";

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  console.log("Password reset successfully:");
  console.log(user);
}

resetPassword()
  .catch((error) => {
    console.error("Failed to reset password:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
