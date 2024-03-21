package redlib.backend.utils;

import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import java.io.*;
import java.lang.reflect.Field;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/**
 * @Description: POJO对象处理类
 * @Author: Keo
 * @Date: Created on 2019/3/1
 */
public class FormatUtils {
    /**
     * 用于产生单号的日期格式化对象
     */
    public static DateTimeFormatter smallDateFormatter = DateTimeFormatter.ofPattern("yyMMdd");

    /**
     * 格式化全日期和时间的对象
     */
    public static DateTimeFormatter fullDateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 仅格式化日期的对象
     */
    public static DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * 小时分钟格式
     */
    public static SimpleDateFormat hourTimeFormatter = new SimpleDateFormat("HH:mm");

    /**
     * 将对象所有String类型的字段trimToNull
     *
     * @param o
     */
    public static void trimFieldToNull(Object o) {
        if (o == null) {
            return;
        }

        Class<?> clazz = o.getClass();
        for (Field field : clazz.getDeclaredFields()) {
            if (field.getType() == String.class) {
                boolean accessible = field.canAccess(o);
                field.setAccessible(true);
                try {
                    String value = trimToNull((String) field.get(o));
                    field.set(o, value);
                } catch (Exception ex) {

                }

                field.setAccessible(accessible);
            }
        }
    }

    /**
     * 判断两个字符串是否相等
     *
     * @param str1
     * @param str2
     */
    public static boolean isStringEqual(String str1, String str2) {
        if (str1 == str2) {
            return true;
        }

        if (str1 == null) {
            return false;
        }

        return str1.equals(str2);
    }

    /**
     * 将字符串
     *
     * @param str
     * @return 非null的一个首位不含空格字符串
     */
    public static String trimToEmpty(String str) {
        return str == null ? "" : str.trim();
    }

    /**
     * 将一个字符串首尾空格去掉，如果为空，返回null
     *
     * @param val 待处理的字符串
     * @return
     */
    public static String trimToNull(String val) {
        val = trimToEmpty(val);
        if (val == null || val.isEmpty()) {
            val = null;
        }

        return val;
    }

    /**
     * 构造模糊匹配的字符串
     *
     * @param value
     * @return
     */
    public static String makeFuzzySearchTerm(String value) {
        value = FormatUtils.trimToNull(value);
        if (value == null) {
            return null;
        }

        return '%' + value + '%';
    }

    public static String formatOrderBy(String orderBy) {
        orderBy = FormatUtils.trimToNull(orderBy);
        if (orderBy == null) {
            return null;
        }

        String[] pairs = orderBy.split(" ");
        if (pairs.length != 2) {
            return null;
        }

        String field = camel2under(pairs[0]);
        String order = "asc";
        if ("descend".equals(pairs[1])) {
            order = "desc";
        }

        return '`' + field + "` " + order;
    }

    public static boolean isAsc(String orderBy) {
        if (!StringUtils.hasText(orderBy)) {
            return false;
        }

        return orderBy.indexOf("desc") < 0;
    }

    /**
     * 产生以prefix为前缀的单号。序数部分采用纳秒生成，保证长度固定
     * 格式为：前缀 + 日期 + 16位十进制数字纳秒序号
     *
     * @param prefix 单号前缀
     * @return 产生一个包含16位纳秒序号的单号字符串
     */
    public static String generateCode(String prefix) {
        String nsTimeString = String.format("%016d", System.nanoTime());
        if (nsTimeString.length() > 16) {
            // 右截断
            nsTimeString = nsTimeString.substring(nsTimeString.length() - 16);
        }

        LocalDateTime date = LocalDateTime.now();
        return String.format("%s%s%s", prefix, date.format(smallDateFormatter), nsTimeString);
    }

    /**
     * 产生以单号为前缀，序号为后缀的明细单号，保证长度固定
     *
     * @param code  单号
     * @param index 序号
     * @return
     */
    public static String generateItemCode(String code, int index) {
        Assert.isTrue(index < 10000, "序号不能超过9999");
        return String.format("%s%04d", code, index);
    }

    public static String formatDate(Date date, DateTimeFormatter formatter) {
        if (date == null) {
            return null;
        }

        Instant instant = date.toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDateTime localDateTime = instant.atZone(zoneId).toLocalDateTime();
        return localDateTime.format(formatter);
    }

    /**
     * 格式化成全日期时间格式：yyyy-MM-dd HH:mm:ss
     *
     * @param date 日期对象
     * @return 格式化字符串
     */
    public static String formatFullDate(Date date) {
        return formatDate(date, fullDateTimeFormatter);
    }

    /**
     * 格式化成日期时间格式：yyyy-MM-dd
     *
     * @param date 日期对象
     * @return 格式化字符串
     */
    public static String formatDate(Date date) {
        return formatDate(date, dateFormatter);
    }

    /**
     * 解析日期字符串，线程安全
     *
     * @param dateString 格式为yyyy-MM-dd的字符串
     * @return 日期对象
     */
    public static Date parseDate(String dateString) {
        if (isEmpty(dateString)) {
            return null;
        }

        LocalDate localDate = LocalDate.parse(dateString, dateFormatter);
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zdt = localDate.atStartOfDay(zoneId);
        return Date.from(zdt.toInstant());
    }

    /**
     * 解析日期时间字符串，线程安全
     *
     * @param dateTimeString 格式为yyyy-MM-dd HH:mm:ss的字符串
     * @return
     */
    public static Date parseDateTime(String dateTimeString) {
        if (isEmpty(dateTimeString)) {
            return null;
        }

        LocalDateTime localDateTime = LocalDateTime.parse(dateTimeString, fullDateTimeFormatter);
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zdt = localDateTime.atZone(zoneId);
        return Date.from(zdt.toInstant());
    }

    /**
     * 将日期格式2019-01-01，格式化成第二天的日期格式：2019-01-02，用于时间范围的过滤
     *
     * @param dateString
     * @return
     */
    public static String formatEndDate(String dateString) {
        if (isEmpty(dateString)) {
            return null;
        }

        LocalDate localDate = LocalDate.parse(dateString, dateFormatter);
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zdt = localDate.atStartOfDay(zoneId);
        zdt = zdt.plusDays(1);
        return formatDate(Date.from(zdt.toInstant()), dateFormatter);
    }

    public static Date formatEndDate(Date date) {
        if (date == null) {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static Date formatBeginDate(Date date) {
        if (date == null) {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static Date formatEndMonth(Date date) {
        if (date == null) {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.MONTH, 1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static Date formatBeginMonth(Date date) {
        if (date == null) {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static Date formatBeginYear(Date date) {
        if (date == null) {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static Date formatEndYear(Date date) {
        if (date == null) {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, 1);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    /**
     * 转值为字符串
     *
     * @param value 对象
     * @return 字符串
     */
    public static String toString(Object value) {
        if (value == null) {
            return "";
        } else if (value instanceof Boolean) {
            if (value.equals(true)) {
                return "1";
            } else {
                return "0";
            }
        }

        return value.toString();
    }

    /**
     * 解析日期时间字符
     */
    public static Date parseDateTime(String dateTimeString, SimpleDateFormat formatter) {
        if (isEmpty(dateTimeString)) {
            return null;
        }

        try {
            return formatter.parse(dateTimeString);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * 转换成 Calendar
     *
     * @param dateTimeString
     * @param formatter
     * @return
     */
    public static Calendar getCronCalendar(String dateTimeString, SimpleDateFormat formatter) {
        Date date = FormatUtils.parseDateTime(dateTimeString, formatter);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        return calendar;
    }

    public static boolean isEmpty(String str) {
        if (str == null) {
            return true;
        }

        return str.isEmpty();
    }

    /**
     * 功能：驼峰命名转下划线命名
     * 小写和大写紧挨一起的地方,加上分隔符,然后全部转小写
     */
    public static String camel2under(String c) {
        String separator = "_";
        c = c.replaceAll("([a-z])([A-Z])", "$1" + separator + "$2").toLowerCase();
        return c;
    }

    /**
     * 功能：下划线命名转驼峰命名
     * 将下划线替换为空格,将字符串根据空格分割成数组,再将每个单词首字母大写
     *
     * @param s
     * @return
     */
    public static String under2camel(String s) {
        String separator = "_";
        String under = "";
        s = s.toLowerCase().replace(separator, " ");
        String sarr[] = s.split(" ");
        for (int i = 0; i < sarr.length; i++) {
            if (i != 0) {
                String w = sarr[i].substring(0, 1).toUpperCase() + sarr[i].substring(1);
                under += w;
            } else {
                under += sarr[i];
            }
        }

        return under;
    }

    public static String pad(String val, int len) {

        StringBuffer str = new StringBuffer();
        if (val != null) str.append(val);
        else val = "";
        if (str.length() > len) return str.substring(0, len);
        for (int i = val.length(); i < len; i++) {
            str.insert(0, '0');
        }
        return str.toString();
    }

    public static String formatIp(String ip) {
        //将长IP格式转为15位长格式。如192.1.1.23转为 192.001.001.023
        if (ip == null || ip.length() == 0) return "";
        String[] parts = ip.split("\\.");
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < parts.length; i++) {
            if (sb.length() != 0) {
                sb.append('.');
            }

            sb.append(pad(parts[i], 3));
        }

        return sb.toString();
    }

    public static String simpleIp(String ip) {
        //将长IP格式的转为短格式的。如192.001.001.023转为192.1.1.23
        String[] parts = ip.split("\\.");
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < parts.length; i++) {
            if (sb.length() != 0) {
                sb.append('.');
            }

            sb.append(Integer.toString(Integer.parseInt(parts[i], 10)));
        }

        return sb.toString();
    }

    public static Map<String, String> parseRequestParams(String url) {
        Map<String, String> params = new HashMap<String, String>();
        String prov_networkargs[] = url.split("://", 2);
        if (prov_networkargs.length < 2) {
            throw new IllegalArgumentException("URLParser: Invalid URL: " + url);
        }
        String network_args[] = prov_networkargs[1].split("[?]");
        if (network_args.length > 1) {
            String keyvalues[] = network_args[1].split("&");
            for (int i = 0; i < keyvalues.length; i++) {
                String toks[] = keyvalues[i].split("=");
                if (toks.length != 2) {
                    params.put(toks[0], "");
                } else {
                    params.put(toks[0], toks[1]);
                }
            }
        }
        return params;
    }

    public static String password(String password) {
        if (password == null) return null;
        if (password.isEmpty()) return password;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1"); //$NON-NLS-1$
            byte[] bytes = password.getBytes();
            bytes = md.digest(bytes);
            md.reset();
            bytes = md.digest(bytes);
            return '*' + byte2hex(bytes);

        } catch (Exception e) {
            return null;
        }
    }

    public static String byte2hex(byte[] b) {
        String hs = "";
        String stmp = "";
        for (int n = 0; n < b.length; n++) {
            stmp = Integer.toHexString(b[n] & 0xFF);
            if (stmp.length() == 1) {
                hs = hs + "0" + stmp;
            } else {
                hs = hs + stmp;
            }
        }
        return hs.toUpperCase();
    }

    public static boolean isSHAPassword(String password) {
        password = trimToEmpty(password).toUpperCase();

        if (isEmpty(password) || password.length() != 41 || password.charAt(0) != '*') {
            return false;
        }

        for (int i = 1; i < password.length(); i++) {
            char c = password.charAt(i);
            if ((c < '0' || c > '9') && (c < 'A' || c > 'F')) {
                return false;
            }
        }

        return true;
    }

    public static String getFileSha1(File file, String key) {
        FileInputStream in = null;
        try {
            in = new FileInputStream(file);
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            byte[] buffer = new byte[1024 * 1024 * 10];

            int len = 0;
            while ((len = in.read(buffer)) > 0) {
                digest.update(buffer, 0, len);
            }
            if (StringUtils.hasText(key)) {
                digest.update(key.getBytes());
            }
            String sha1 = new BigInteger(1, digest.digest()).toString(16);
            int length = 40 - sha1.length();
            if (length > 0) {
                for (int i = 0; i < length; i++) {
                    sha1 = "0" + sha1;
                }
            }
            return sha1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * 解压文件
     *
     * @param zipFile  要解压的目标文件
     * @param destPath 指定解压目录
     * @return 解压结果：成功，失败
     */

    @SuppressWarnings("rawtypes")

    public static boolean decompressZip(File zipFile, File destPath) {
        boolean flag = false;
        if (!destPath.exists()) {
            destPath.mkdirs();
        }

        ZipFile zip = null;
        try {
            zip = new ZipFile(zipFile, Charset.forName("utf-8"));//防止中文目录，乱码
            for (Enumeration entries = zip.entries(); entries.hasMoreElements(); ) {
                ZipEntry entry = (ZipEntry) entries.nextElement();
                String zipEntryName = entry.getName();

                InputStream in = zip.getInputStream(entry);

                //指定解压后的文件夹+当前zip文件的名称
                String outPath = (destPath.getCanonicalPath() + File.separator + zipEntryName).replace("/", File.separator);

                //判断路径是否存在,不存在则创建文件路径
                File file = new File(outPath.substring(0, outPath.lastIndexOf(File.separator)));

                if (!file.exists()) {
                    file.mkdirs();
                }

                //判断文件全路径是否为文件夹,如果是上面已经上传,不需要解压
                if (new File(outPath).isDirectory()) {
                    continue;
                }

                //保存文件路径信息(可利用md5.zip名称的唯一性，来判断是否已经解压)
                OutputStream out = new FileOutputStream(outPath);
                byte[] buf1 = new byte[2048];
                int len;
                while ((len = in.read(buf1)) > 0) {
                    out.write(buf1, 0, len);
                }

                in.close();
                out.close();
            }

            flag = true;
            //必须关闭，要不然这个zip文件一直被占用着，要删删不掉，改名也不可以，移动也不行，整多了，系统还崩了。
            zip.close();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (zip != null) {
                try {
                    zip.close();
                } catch (Exception ex) {
                }
            }
        }

        return flag;
    }

    public static Date getTomorrow() {
        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static String getRandomString(int length) {
        String str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(62);
            sb.append(str.charAt(number));
        }
        return sb.toString();
    }

    public static String processTemplate(String str, Map<String, String> varMap) {
        if (!StringUtils.hasText(str)) {
            return str;
        }

        String patternString = "\\$\\{([\\w,:]+)\\}";
        StringBuffer sb = new StringBuffer();
        //String str = "I have ${1} and ${2}";
        Pattern pattern = Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(str);
        while (matcher.find()) {
            String key = trimToEmpty(matcher.group(1));
            String val = "";

            val = varMap.get(key);
            if (val == null) {
                val = "";
            }
            matcher.appendReplacement(sb, val);
        }
        matcher.appendTail(sb);
        return sb.toString();
    }
}
