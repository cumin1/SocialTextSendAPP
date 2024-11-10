
import requests
import random
import string

# 生成随机字符串的函数
def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))

# 用户注册接口测试
def test_user_registration():
    url = 'http://localhost:3000/api/users/register'  # 请根据实际情况修改URL
    username = generate_random_string(8)  # 生成随机用户名
    email = f"{generate_random_string(5)}@example.com"  # 生成随机邮箱
    password = generate_random_string(10)  # 生成随机密码

    data = {
        'username': username,
        'email': email,
        'password': password
    }

    response = requests.post(url, json=data)
    print("用户注册响应:", response.json())

# 发布文章接口测试
def test_publish_article():
    url = 'http://localhost:3000/api/articles'  # 请根据实际情况修改URL
    title = generate_random_string(15)  # 生成随机文章标题
    content = generate_random_string(100)  # 生成随机文章内容
    tags = generate_random_string(5)  # 生成随机标签

    data = {
        'title': title,
        'content': content,
        'tags': tags
    }

    response = requests.post(url, json=data)
    print("发布文章响应:", response.json())

# 执行测试
if __name__ == "__main__":
    for i in range(100):
        test_user_registration()  # 测试用户注册
        test_publish_article()     # 测试发布文章