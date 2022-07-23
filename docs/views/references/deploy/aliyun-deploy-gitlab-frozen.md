# 阿里云服务器搭建GItLab以后出现卡顿

## 一、原因分析
最近索性自己用阿里云服务器搭建了一个 gitlab 服务器以供自己开发使用，服务器搭建很简单，但是使用起来是相当的卡顿，在代码 pull，push 过程中都会有相应的延迟，很糟心。起初我以为是我的阿里云服务器配置过低造成的（1核，2G，centos7），后来发现不是这样。

gitlab 启动运行就占用了大量的内存，2G内存在启动后已经所剩无几。想再进行 git 相关操作自然也就会出现卡顿现象。

正常 centos 应该是启用 swap 分区的，但是阿里云，腾讯云的服务器却没有swap分区！

通过以下命令查看swap分区情况：
```
cat /proc/swaps
```
结果并没有swap分区
## 二、解决方法

1、创建 swap 分区（这里需要等待几秒）
```
dd if=/dev/zero of=/data/swap bs=512 count=8388616
```
注意：创建swap大小为bs*count=4294971392(4G)，/data/swap目录若无则找/mnt/swap(我使用的是下面的指令生效)
```
dd if=/dev/zero of=/mnt/swap bs=512 count=8388616
```
2、通过mkswap命令将上面新建出的文件做成swap分区
```
mkswap /mnt/swap
```
3、查看内核参数vm.swappiness中的数值是否为0，如果为0则根据实际需要调整成60。查看参数：
```
cat /proc/sys/vm/swappiness
```
设置参数：
```
sysctl -w vm.swappiness=60
```
启用 swap 分区
```
swapon /mnt/swap
echo “/mnt/swap swap swap defaults 0 0” >> /etc/fstab
```
5、再次使用cat /proc/swaps 查看swap分区是否启动。可以看到，swap分区已经启用，现在通过 gitlab 进行操作会发现很流畅！

## 可能出现的问题

当时可能gitlab运行没问题，后续的时候发现swap分区并未执行，可以试一下永久修改，则编辑`/etc/sysctl.conf`文件，将vm.swappiness改为30或者60
