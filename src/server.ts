import app from "./app";
import { createDefaultUserIfEmpty } from "./shared/utils/seedUser";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createDefaultUserIfEmpty();
});
