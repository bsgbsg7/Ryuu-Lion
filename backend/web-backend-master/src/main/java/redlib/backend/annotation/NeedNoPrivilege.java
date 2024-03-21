package redlib.backend.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 为某个Webservice的方法添加权限注解，表示该方法不需要权限即可调用。<br>
 * 无参数
 *
 * @author hongwenchina
 */

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface NeedNoPrivilege {
}
