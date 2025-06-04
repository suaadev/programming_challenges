#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool isPalindrome(char text[])
{
    int size_text = strlen(text);

    for (int i = 0; i < (int)(size_text / 2); i++)
    {
        if (text[i] != text[size_text - i - 1])
        {
            return false;
        }
    }

    return true;
}

int main()
{
    char text[] = "12340ns4321";
    printf("%d", isPalindrome(text));
    return 0;
}