package redlib.backend.utils;

import org.springframework.util.Assert;

import java.io.*;
import java.nio.file.*;

public class FileUtils {
    public static void copyDir(String src, String dest, boolean overwrite) {
        try {
            Files.walk(Paths.get(src)).forEach(a -> {
                Path b = Paths.get(dest, a.toString().substring(src.length()));
                try {
                    if (!a.toString().equals(src))
                        Files.copy(a, b, overwrite ? new CopyOption[]{StandardCopyOption.REPLACE_EXISTING} : new CopyOption[]{});
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        } catch (IOException e) {
            //permission issue
            e.printStackTrace();
        }
    }

    public static void cleanDirectory(String directory) {
        try {
            File dir = new File(directory);
            if (!dir.exists()) {
                return;
            }
            for (File file : dir.listFiles()) {
                file.delete();
            }
            dir.delete();
        } catch (Exception ex) {
        }
    }

    public static void cleanWorkingFiles(String directory) {
        cleanDirectory(directory + "/raw/");
        cleanDirectory(directory + "/thumbnail/");
        cleanDirectory(directory + "/segment/");
        cleanDirectory(directory + "/");
    }

    public static String readFile(String jsonFile) throws Exception {
        String path = System.getProperty("user.dir");
        File file = new File(path + "/" + jsonFile);
        BufferedReader reader = null;
        if (file.exists()) {
            InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");
            reader = new BufferedReader(isr);
        } else {
            InputStream inputStream = FileUtils.class.getResourceAsStream("/" + jsonFile);
            Assert.notNull(inputStream, jsonFile + " not exist.");
            StringBuffer sb = new StringBuffer();
            reader = new BufferedReader(new InputStreamReader(inputStream, "utf-8"));
        }
        StringBuffer sb = new StringBuffer();
        try {
            while (true) {
                String line = reader.readLine();
                if (line == null) {
                    break;
                }
                sb.append(line);
                sb.append("\n");
            }
        } finally {
            try {
                reader.close();
            } catch (Exception e) {
            }
        }
        return sb.toString();
    }
}
