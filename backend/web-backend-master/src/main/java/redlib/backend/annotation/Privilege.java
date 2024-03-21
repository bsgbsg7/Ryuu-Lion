package redlib.backend.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 为某个Webservice的方法添加权限注解。<br>
 * 例如：@Privilege( {"add","update"} )表示add或者update有其中之一就可以访问。
 * 当有多个权限项时候，这些权限是逻辑或的操作。<br>
 * 无参数表示只要有定义的权限中的任意一项，就可以访问，如@Privilege
 *
 * @author hongwenchina
 */

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Privilege {
    String[] value() default {};
}
