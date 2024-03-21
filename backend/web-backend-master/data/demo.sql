/*
Navicat MySQL Data Transfer

Source Server         : 我得Mysql
Source Server Version : 50735
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50735
File Encoding         : 65001

Date: 2023-03-03 11:06:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_code` varchar(40) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT '1',
  `enabled` tinyint(1) DEFAULT '1',
  `password` varchar(41) DEFAULT NULL,
  `department` varchar(128) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL COMMENT '创建人',
  `updated_by` int(11) DEFAULT NULL COMMENT '更新人',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'root', '管理员', '1', '1', '*E6CC90B878B948C35E92B003C792C46C58C4AF40', '管理员', null, 'root', '1', '1', '2021-01-01 08:00:00', '2023-01-11 11:41:40');
INSERT INTO `admin` VALUES ('2', 'test', '测试账户', '0', '1', '*E6CC90B878B948C35E92B003C792C46C58C4AF40', null, null, null, null, '1', '2023-01-10 22:14:16', '2023-01-11 13:00:57');

-- ----------------------------
-- Table structure for admin_priv
-- ----------------------------
DROP TABLE IF EXISTS `admin_priv`;
CREATE TABLE `admin_priv` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` varchar(40) NOT NULL,
  `mod_id` varchar(64) NOT NULL,
  `priv` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iUnique` (`admin_id`,`mod_id`,`priv`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_priv
-- ----------------------------
INSERT INTO `admin_priv` VALUES ('14', '2', 'admin', 'page');
INSERT INTO `admin_priv` VALUES ('2', '3', 'admin', 'add');
INSERT INTO `admin_priv` VALUES ('3', '3', 'admin', 'delete');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) DEFAULT NULL COMMENT '部门名称',
  `contact` varchar(50) DEFAULT NULL COMMENT '联系人',
  `contact_phone` varchar(100) DEFAULT NULL COMMENT '联系电话',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_by` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `updated_by` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `deleted` tinyint(4) DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '通信所3444', '张三', 'ddd', '这是一条备注', '2019-12-03 17:31:28', '2023-03-03 10:36:23', '1', '1', '0');
INSERT INTO `department` VALUES ('2', '通信所', '张三', '1532384234234', '这是一条备注', '2019-12-03 17:48:06', '2023-03-03 10:36:29', '1', '1', '0');

-- ----------------------------
-- Table structure for login_log
-- ----------------------------
DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_code` varchar(64) NOT NULL,
  `ip_address` varchar(46) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `os` varchar(128) DEFAULT NULL,
  `browser` varchar(128) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=436 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_log
-- ----------------------------
INSERT INTO `login_log` VALUES ('1', 'root', '127.0.0.1', '管理员', 'Windows 10', 'Chrome 10 108.0.0.0', '2023-01-11 15:45:16');
INSERT INTO `login_log` VALUES ('2', 'root', '127.0.0.1', '管理员', 'Windows 10', 'Chrome 10 V108.0.0.0', '2023-01-11 15:45:53');